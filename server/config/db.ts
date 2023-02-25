import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictQuery", false);

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/vull-sortir";

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);
		console.log("Connected to database");
	} catch (error) {
		console.error("Error connecting to database:", error.message);
		process.exit(1);
	}
};

export default connectDB;
