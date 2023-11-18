import { Schema, model } from "mongoose";

export interface IServer extends Document {
	guildId: string;
	name: string;
	icon: string;
	ownerId: string;
	language: string;
}

const ServerSchema = new Schema({
	guildId: { type: String, required: true },
	name: { type: String, required: true },
	icon: { type: String, required: true },
	ownerId: { type: String, required: true },
	language: { type: String, default: "en" },
});

export default model<IServer>("Server", ServerSchema);
