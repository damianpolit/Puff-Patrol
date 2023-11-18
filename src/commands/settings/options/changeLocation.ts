import { Client, Events, StringSelectMenuInteraction } from "discord.js";
import { getLocationModal } from "../settingsEmbed";
import { setUserLocation } from "../../../modules/userSettingsModule";

const changeLocation = async (
	client: Client,
	interaction: StringSelectMenuInteraction,
) => {
	await interaction.showModal(getLocationModal());

	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isModalSubmit()) return;
		if (interaction.customId === "locationModal") {
			var location = interaction.fields.getTextInputValue("locationInput");
			await setUserLocation(interaction.user.id, location);
			await interaction.reply({
				content: `Twoja domyślna lokacja została zmieniona na **${location}**`,
				ephemeral: true,
			});
		}
	});
};

export default changeLocation;
