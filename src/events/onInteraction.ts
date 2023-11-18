import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { CommandList } from "../commands/commands";

export const onInteraction = async (interaction: Interaction) => {
	if (interaction.isCommand()) {
		for (const Command of CommandList) {
			if (interaction.commandName === Command.data.name) {
				await Command.run(interaction as ChatInputCommandInteraction);
				break;
			}
		}
	}
};
