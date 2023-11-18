import { Schema, model } from "mongoose";

interface IDailyInformation {
	enable: boolean;
	time: string;
	wasSent: boolean;
}

export interface IUserSettings extends Document {
	userId: string;
	baseLocation: string;
	dailyInformation: IDailyInformation;
}

const UserSettings = new Schema({
	userId: { type: String, required: true },
	baseLocation: { type: String, required: true },
	dailyInformation: {
		enable: { type: Boolean, required: false, default: false },
		time: { type: String, required: false },
		wasSent: { type: Boolean, required: false, default: false },
	},
});

export default model<IUserSettings>("UserSettings", UserSettings);
