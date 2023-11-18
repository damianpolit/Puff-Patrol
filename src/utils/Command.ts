import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
	data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
	run: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
