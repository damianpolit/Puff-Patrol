import { Guild } from "discord.js";
import { addServerToDatabase } from "../modules/serverModule";

export const guildCreate = async (guild: Guild) => {
	try {
		await addServerToDatabase(guild);
		console.log("Bot has join to server, saved to db");
	} catch (err) {
		console.log("error: ", err);
	}
};
