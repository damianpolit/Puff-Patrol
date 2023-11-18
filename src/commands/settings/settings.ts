import {
	CommandInteraction,
	ComponentType,
	GuildMember,
	PermissionsBitField,
	SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../utils/Command";
import { t } from "i18next";
import { getSettingsEmbed, getSettingsSelectMenu } from "./settingsEmbed";
import { client } from "../../Bot";
import changeLocation from "./options/changeLocation";
import changeDailyNotifications from "./options/changeDailyNotifications";
import changeServerLanguage from "./options/changeServerLanguage";

export const settings: Command = {
	data: new SlashCommandBuilder()
		.setName(t("settings.name"))
		.setDescription(t("settings.description")),

	async run(interaction: CommandInteraction) {
		const member = interaction.member as GuildMember;
		const isAdmin = member.permissions.has([
			PermissionsBitField.Flags.Administrator,
		]);

		const response = await interaction.reply({
			embeds: [getSettingsEmbed()],
			components: [getSettingsSelectMenu(isAdmin)],
			ephemeral: true,
		});

		try {
			const collector = response.createMessageComponentCollector({
				componentType: ComponentType.StringSelect,
				time: 60_000,
			});

			collector.on("collect", async (i) => {
				const option = i.values[0];
				if (option === "location") {
					changeLocation(client, i);
				}
				if (option === "daily_notifications") {
					changeDailyNotifications(client, i);
				}
				// if (option === "global_notifications") {
				// }

				if (option === "server_language") {
					changeServerLanguage(client, i);
				}

				await interaction.editReply({
					components: [],
				});
			});
			collector.on("end", async (collected) => {
				await interaction.editReply({
					components: [],
				});
			});
		} catch (error) {
			await interaction.editReply({
				components: [],
			});
			await interaction.followUp({
				content: t("settings.options.selectedTimeout"),
				ephemeral: true,
			});
		}
	},
};
