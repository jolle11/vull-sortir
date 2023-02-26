import { NextFunction, Request, Response } from "express";

interface ErrorResponse {
	message: string;
	stack?: string;
	status: number;
}

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const statusCode = res.statusCode || 500;
	const errorResponse: ErrorResponse = {
		message: err.message,
		status: statusCode,
	};
	if (process.env.NODE_ENV !== "production") {
		errorResponse.stack = err.stack;
	}

	res.status(statusCode).json(errorResponse);
};

export default errorHandler;
