import { Client } from "discord.js";
import { onReady } from "./events/onReady";
import { guildCreate } from "./events/onGuildCreate";
import { IntentOptions } from "./config/IntentOption";
import { onInteraction } from "./events/onInteraction";

console.log("Bot is starting...");

export const client = new Client({
	intents: IntentOptions,
});

(async () => {
	client.on(
		"interactionCreate",
		async (interaction) => await onInteraction(interaction),
	);
	client.on("ready", () => onReady(client));
	client.on("guildCreate", (guild) => guildCreate(guild));
	client.on("guildDelete", (guild) => console.log(guild));
	client.on("error", (error) => console.log(error));
	client.on("warn", (warn) => console.log(warn));

	process.on("SIGTERM", () => {
		console.log("Closing application..");
		client.destroy();
	});
})();

client.login(process.env.DISCORD_BOT_TOKEN);
