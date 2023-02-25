import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
			req.userId = (decodedToken as { userId: string }).userId;
			next();
		} catch (error) {
			res.status(401).json({ message: "Invalid token" });
		}
	} else {
		res.status(401).json({ message: "Missing token" });
	}
};

export default verifyToken;
