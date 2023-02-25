import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "user" | "admin";
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: "user",
			enum: ["user", "admin"],
		},
	},
	{
		timestamps: true,
		collection: "users",
		versionKey: false,
	},
);

export default mongoose.model<IUser>("User", UserSchema);
