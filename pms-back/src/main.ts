import "reflect-metadata";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.ts"
import morgan from "morgan";
import cors from "cors";
import { log } from "node:console";
import helmet from "helmet";
import { AppDataSource } from "./data_source.ts";
import { userRoutes } from "./routes/public/userRoute.ts";
import { emailRoutes } from "./routes/public/emailRoute.ts";
import { slotRoutes } from './routes/public/slotRoute.ts';
import { vehicleRoutes } from './routes/public/vehicleRoute.ts';
import { bookingRoutes } from './routes/public/bookingRoute.ts';
import { notificationRoutes } from './routes/public/notificationRoute.ts';
import { historyRoutes } from './routes/public/historyRoute.ts';

const app = express();

// Apply middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use("/rest/pms/api/docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection initialized");
  })
  .catch((error) => console.log("Database connection error: ", error));

app.use("/rest/pms/api/v1", userRoutes);
app.use("/rest/pms/api/v1", emailRoutes);
app.use('/rest/pms/api/v1', slotRoutes);
app.use('/rest/pms/api/v1', vehicleRoutes);
app.use('/rest/pms/api/v1', bookingRoutes);
app.use('/rest/pms/api/v1', notificationRoutes);
app.use('/rest/pms/api/v1', historyRoutes);

// Base route for API status
app.get("/api/status", (req, res) => {
  res.json({ status: "API is running", time: new Date() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server

app.listen(process.env.PORT, () => {
    log(`API documentation on ${process.env.SWAGGER_URL}`);
}
);