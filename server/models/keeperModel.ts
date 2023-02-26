import mongoose, { Document, Schema } from "mongoose";

export interface IKeeper extends Document {
	name: string;
	email: string;
	password: string;
	role: "keeper" | "admin";
	dogs: number;
	age?: string;
	address?: string;
	phone?: string;
	profileImage?: string;
	createdAt: Date;
	updatedAt: Date;
}

const KeeperSchema: Schema = new Schema(
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
			default: "keeper",
			enum: ["keeper", "admin"],
		},
		dogs: {
			type: Number,
			required: true,
		},
		age: {
			type: String,
		},
		address: {
			type: String,
		},
		phone: {
			type: String,
		},
		profileImage: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: "users",
		versionKey: false,
	},
);

export default mongoose.model<IKeeper>("Keeper", KeeperSchema);
