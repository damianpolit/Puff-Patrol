import { connect } from "mongoose";

export const connectDatabase = async () => {
	await connect(process.env.MONGO_URI as string)
		.then(() => {
			console.log("Database connected!");
		})
		.catch((error) => {
			console.error(error);
		});
};
