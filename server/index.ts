import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

// Establecer conexión a la base de datos
connectDB();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware de CORS
app.use(cors());

// Middleware de body parser
app.use(express.json());

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Ruta principal
app.get("/", (_req: Request, res: Response) => {
	res.send("Bienvenido a Vull Sortir API");
});

app.listen(PORT, () => console.log(`🏃💨 ${PORT}`));
