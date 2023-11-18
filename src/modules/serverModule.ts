import { Guild } from "discord.js";
import Server, { IServer } from "../model/Server";

export const addServerToDatabase = async (guild: Guild) => {
	const server = new Server({
		guildId: guild.id,
		name: guild.name,
		icon: guild.iconURL() ?? "",
		ownerId: guild.ownerId,
	});

	await server.save();
};

export const removeServerFromDatabase = async () => {};

export const loadServerData = async () => {};

export const loadAllServerData = async (): Promise<IServer[]> => {
	return Server.find() ?? [];
};

export const getLanguage = async (guildId: string) => {
	const server = await Server.findOne({ guildId });
	return server?.language;
};
