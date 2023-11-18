import { Client, Events, StringSelectMenuInteraction } from "discord.js";
import {
	getUserLocation,
	setUserLocation,
	setUserNotificationTime,
} from "../../../modules/userSettingsModule";
import { log } from "console";
import { getDailyNotificationsModal } from "../settingsEmbed";

const changeDailyNotifications = async (
	client: Client,
	interaction: StringSelectMenuInteraction,
) => {
	const userHaveSavedLocation = await getUserLocation(interaction.user.id);
	log(!!userHaveSavedLocation);
	await interaction.showModal(
		getDailyNotificationsModal(!!userHaveSavedLocation),
	);

	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isModalSubmit()) return;
		if (interaction.customId === "dailyNotificationsModal") {
			const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

			const dailyNotificationTime = interaction.fields.getTextInputValue(
				"dailyNotificationsInput",
			);
			if (!timeRegex.test(dailyNotificationTime)) {
				await interaction.reply({
					content: `Niepoprawny format czasu. Poprawny format to **HH:MM**`,
					ephemeral: true,
				});
				return;
			}
			let location;
			try {
				location = interaction.fields.getTextInputValue("locationInput");
			} catch (error) {
				log(error);
			}
			if (location) {
				await setUserLocation(interaction.user.id, location);
			}

			await setUserNotificationTime(interaction.user.id, dailyNotificationTime);
			await interaction.reply({
				content: `Twoj czas notifikacji został ustawiony na godzinę **${dailyNotificationTime}**. Powiadomienia będą wysyłane z Twojej domyślnej lokacji.`,
				ephemeral: true,
			});
		}
	});
};

export default changeDailyNotifications;
