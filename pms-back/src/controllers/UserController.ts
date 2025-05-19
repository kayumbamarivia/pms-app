import { Request, Response } from "express";
import { UserService } from "../services/UserService.ts";
import { HistorySubscriber } from "../utils/HistorySubscriber.ts";
import { generateToken } from "../utils/jwt.ts";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findById(id);
      
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { names, email, password, role } = req.body;
   
      if (!names || !email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        res.status(409).json({ message: "Email already in use" });
        return;
      }
      
      const newUser = await this.userService.create({
        names,
        email,
        password,
        role
      });

      HistorySubscriber.setActionContext(email, "signup")
      
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { names, email, password, role } = req.body;
      
      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      if (email && email !== user.email) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
          res.status(409).json({ message: "Email already in use" });
          return;
        }
      }
      
      const updatedUser = await this.userService.update(id, {
        names,
        email, 
        password,
        role
      });
      
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // DELETE user
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      await this.userService.delete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // POST login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }
      
      const user = await this.userService.validateCredentials(email, password);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      
      const token = generateToken({email: user.email, id: user.id, role: user.role});

      res.status(200).json({
        message: "Login successful",
        user: user,
        token: token
      });

      HistorySubscriber.setActionContext(email, "signup")
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // PATCH change user role
  async changeUserRole(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { role } = req.body;
      
      if (!role) {
        res.status(400).json({ message: "Role is required" });
        return;
      }
      
      const user = await this.userService.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      const updatedUser = await this.userService.changeRole(id, role);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error changing user role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}