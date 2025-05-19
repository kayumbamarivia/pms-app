import { Router } from "express";
import { UserController } from "../../controllers/UserController.ts";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers.bind(userController));

router.get("/users/:id", userController.getUserById.bind(userController));

router.post("/register", userController.createUser.bind(userController));

router.put("/users/:id", userController.updateUser.bind(userController));

router.delete("/users/:id", userController.deleteUser.bind(userController));


router.post("/login", userController.login.bind(userController));

router.patch("/users/:id/role", userController.changeUserRole.bind(userController));

export { router as userRoutes };