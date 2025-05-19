import { hash, compare } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository.ts";
import { User } from "../models/User.ts";

export class UserService {
  async findAll(): Promise<User[]> {
    return UserRepository.find();
  }
  
  async findById(id: number): Promise<User | null> {
    return UserRepository.findOneBy({ id });
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return UserRepository.findByEmail(email);
  }
  
  async create(userData: Partial<User>): Promise<User> {
    if (userData.password) {
      userData.password = await hash(userData.password, 10);
    }
    
    const user = UserRepository.create(userData);
    return UserRepository.save(user);
  }
  
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    if (userData.password) {
      userData.password = await hash(userData.password, 10);
    }
    
    await UserRepository.update(id, userData);
    return this.findById(id);
  }
  
  async delete(id: number): Promise<boolean> {
    const result = await UserRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
  
  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await UserRepository.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .addSelect("user.password")
      .getOne();
      
    if (!user) return null;
    
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }
  
  async changeRole(id: number, newRole: string): Promise<User | null> {
    await UserRepository.update(id, { role: newRole });
    return this.findById(id);
  }
}