import { Client, ComponentType, StringSelectMenuInteraction } from "discord.js";
import { languageSelectMenu } from "../settingsEmbed";
import i18next, { t } from "i18next";

const changeServerLanguage = async (
	client: Client,
	interaction: StringSelectMenuInteraction,
) => {
	const response = await interaction.reply({
		content: "Select a language to change the server language",
		components: [languageSelectMenu()],
		ephemeral: true,
	});

	try {
		const collector = response.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			time: 60_000,
		});

		collector.on("collect", async (i) => {
			const language = i.values[0];

			i18next.changeLanguage(language);

			await interaction.followUp({
				content: `You selected **${language.toUpperCase()}**`,
				ephemeral: true,
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
};

export default changeServerLanguage;
