import { Router } from "express";
import { EmailController } from "../../controllers/EmailController.ts";

const router = Router();
const emailController = new EmailController();

router.post("/send-mail", emailController.sendEmail.bind(emailController));

export { router as emailRoutes };