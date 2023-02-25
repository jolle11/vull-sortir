import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// REGISTER USER
// METHOD - POST
// URL - http://localhost:5001/api/users/
export const registerUser = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		console.log("CREATE USER");
		const { name, email, password, role } = req.body;

		// rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
		if (!name || !email || !password) {
			throw new Error("Name, email, and password are required");
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email format");
		}

		const userRole = role || "user";

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name,
			email,
			password: hashedPassword,
			role: userRole,
		});

		const savedUser = await user.save();

		const token = jwt.sign(
			{
				id: savedUser._id,
				email: savedUser.email,
				role: savedUser.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			},
		);

		res.status(201).json({ token, savedUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// LOGIN USER WITH JWT
// METHOD - POST
// URL - http://localhost:5001/api/login
export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		// Search user by email
		const user = await User.findOne({ email });

		// If user does not exist, we throw an auth error
		if (!user) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Compare password with hashed one
		const isMatch = await bcrypt.compare(password, user.password);

		// If they are not the same, we throw an auth error
		if (!isMatch) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// If everything is correct, we generate a new JWT
		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			},
		);

		res.status(200).json({
			token,
			state: "You are logged in. Token will expire in one hour",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// GET USER PROFILE
// METHOD - GET
// URL - http://localhost:5001/api/user/profile
export const getUserProfile = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
			id: string;
		};

		const user = await User.findById(decodedToken.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const { _id, ...userData } = user.toJSON();
		const userWithoutIdUnderscore = { id: _id.toString(), ...userData };

		res.status(200).json(userWithoutIdUnderscore);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
