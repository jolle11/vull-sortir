import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// URL - http://localhost:5001/api/users/
// METHOD - POST
// CREATE USER
export const createUser = async (
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

		// Set default role if not provided
		const userRole = role || "user";

		// Generamos un salt para el hashing
		const salt = await bcrypt.genSalt(10);

		// Hasheamos la contraseña
		const hashedPassword = await bcrypt.hash(password, salt);

		// Creamos el usuario con la contraseña hasheada
		const user = new User({
			name,
			email,
			password: hashedPassword,
			role: userRole,
		});

		// Guardamos el usuario en la base de datos
		const savedUser = await user.save();

		res.status(201).json(savedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
		} else {
			const { _id, ...userData } = user.toObject();
			const userWithoutIdUnderscore = { id: _id.toString(), ...userData };
			res.status(200).json(userWithoutIdUnderscore);
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
