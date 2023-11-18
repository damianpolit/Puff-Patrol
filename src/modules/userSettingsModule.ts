import { log } from "console";
import UserSettings, { IUserSettings } from "../model/UserSettings";

const createUserSettings = async (userId: string, baseLocation: string) => {
	log("Creating user settings");
	await UserSettings.create({
		userId,
		baseLocation,
	});
};

export const setUserLocation = async (userId: string, baseLocation: string) => {
	(await UserSettings.findOneAndUpdate({ userId }, { baseLocation })) ||
		createUserSettings(userId, baseLocation);
};

export const setUserNotificationTime = async (userId: string, time: string) => {
	await UserSettings.findOneAndUpdate(
		{ userId },
		{ dailyInformation: { enable: true, wasSent: true, time } },
	);
};

export const getUserLocation = async (
	userId: string,
): Promise<string | undefined> => {
	return await UserSettings.findOne({ userId }).then((userSettings) => {
		return userSettings?.baseLocation;
	});
};

export const restartDailyInformationSend = async () => {
	const updateData = { "dailyInformation.wasSent": false };

	await UserSettings.updateMany({}, { $set: updateData });
};

export const getAllEnabledDailyNotifications = async (): Promise<
	IUserSettings[]
> =>
	await UserSettings.find({
		"dailyInformation.enable": true,
		"dailyInformation.wasSent": false,
	});

export const markNotificationAsSent = async (userId: string) => {
	const updateData = { "dailyInformation.wasSent": true };

	await UserSettings.findOneAndUpdate({ userId }, { $set: updateData });
};

export const disableDailyNotifications = async (userId: string) => {
	UserSettings.findOneAndUpdate(
		{ userId },
		{ dailyInformation: { enable: false, wasSent: true } },
	);
};
