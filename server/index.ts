import connectDB from "./config/db";
import errorHandler from "./middleware/errorMiddleware";
import keeperRoutes from "./routes/keeperRoutes";
import walkerRoutes from "./routes/walkerRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

connectDB();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// Keeper routes
app.use("/api/users/keeper", keeperRoutes);
// Walker routes
app.use("/api/users/walker", walkerRoutes);

// Main route
app.get("/", (_req: Request, res: Response) => {
	res.send("Welcome to Vull Sortir API");
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`🏃💨 ${PORT}`));
