import { Client, REST, Routes } from "discord.js";
import { connectDatabase } from "../config/database";
import { loadAllServerData } from "../modules/serverModule";
import { CommandList } from "../commands/commands";
import cron from "node-cron";
import { log } from "console";
import { restartDailyInformationSend } from "../modules/userSettingsModule";
import { checkIfDailyNotificationShouldBeSent } from "./cron/dailyNotifications";

export const onReady = async (client: Client) => {
	connectDatabase();
	loadDiscordServers(client);

	console.log("Bot is ready!");
};

const loadDiscordServers = async (client: Client) => {
	const commandData = CommandList.map((command) => command.data.toJSON());

	const guilds = await loadAllServerData();

	guilds.forEach((guild) => {
		const g = client.guilds.cache.get(guild.guildId);
		console.info(`Loading "${g?.name} | ${g?.id} | db id: ${guild.guildId}`);
		if (g?.id !== undefined) {
			rest.put(
				Routes.applicationGuildCommands(
					client.user?.id ?? "missing id",
					guild.guildId,
				),
				{ body: commandData },
			);
		}
	});

	//cron job for updating airquality
	cron.schedule("* * * * *", () => {
		console.log("running a task every minute");
		checkIfDailyNotificationShouldBeSent();
	});

	//cron job for restart airquality flag
	cron.schedule("0 0 * * *", async () => {
		try {
			restartDailyInformationSend();
			console.log("Restarting job completed! 🎉");
		} catch (error) {
			console.error("Błąd podczas wykonywania zadania o północy:", error);
		}
	});

	log("cron jobs started");
};

const rest = new REST({ version: "9" }).setToken(
	process.env.DISCORD_TOKEN as string,
);
