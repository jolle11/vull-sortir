import mongoose, { Document, Schema } from "mongoose";

export interface IWalker extends Document {
	name: string;
	email: string;
	password: string;
	role: "walker" | "admin";
	age?: string;
	address?: string;
	phone?: string;
	profileImage?: string;
	walkRate?: number;
	minTime?: string;
	createdAt: Date;
	updatedAt: Date;
}

const WalkerSchema: Schema = new Schema(
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
			default: "walker",
			enum: ["walker", "admin"],
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
		walkRate: {
			type: String,
		},
		minTime: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: "users",
		versionKey: false,
	},
);

export default mongoose.model<IWalker>("Walker", WalkerSchema);
