import {
	ActionRowBuilder,
	EmbedBuilder,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";

export const getSettingsEmbed = () => {
	return new EmbedBuilder()
		.setTitle("Ustawienia bota")
		.setDescription(
			"Wybierz ustawienie, które chciałbyś zmodyfikować. Jeśli nie widzisz rozwijanego paska z opcjami, uruchom komende `/ustawienia` jeszcze raz. Zależnie od twoich uprawnień, ilość poleceń może się różnić. \n\nJeśli chcesz wesprzeć utrzymanie serwera, który pozwala działać botowi 24/7, wpłać dotację tutaj: **https://ko-fi.com/anae_dev**",
		)
		.setColor(0x00ffff)
		.setThumbnail(
			"https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png",
		)
		.setFooter({
			text: "Bot stworzony przez Anae ❤️",
		});
};

export const getSettingsSelectMenu = (isAdmin: boolean) => {
	const select = new StringSelectMenuBuilder()
		.setCustomId("settings_select")
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel("Ustaw swoją lokalizacje")
				.setDescription(
					"Kiedy masz ustawioną lokalizację, możesz używać komendy /jakość bez podawania miejsca",
				)
				.setValue("location")
				.setEmoji("✅"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Ustaw powiadomienia dzienne")
				.setDescription(
					"Wskaż godzine oraz miejsce (domyślnie - lokalizacja) z którego ma być wysyłana codzienne informacja.",
				)
				.setValue("daily_notifications")
				.setEmoji("⏰"),
			// new StringSelectMenuOptionBuilder()
			// 	.setLabel("Ustaw powiadomienia globalne (admin only)")
			// 	.setDescription(
			// 		"Ustaw powiadomienie serwerowe, które będzie oznaczać rangę i informować o jakości powietrza.",
			// 	)
			// 	.setValue("global_notifications")
			// 	.setEmoji("🔔"),
		);
	if (isAdmin) {
		select.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel("Ustaw język bota na serwerze. [ADMIN]")
				.setDescription("Ustawienia językowe dla bota.")
				.setValue("server_language")
				.setEmoji("🌐"),
		);
	}

	return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
};

//LANGUAGE SELECT MENU
export const languageSelectMenu = () => {
	const select = new StringSelectMenuBuilder()
		.setCustomId("serverLanguageSelectMenu")
		.setPlaceholder("Select a language")
		.addOptions([
			new StringSelectMenuOptionBuilder()
				.setLabel("Polish")
				.setValue("pl")
				.setEmoji("🇵🇱"),

			new StringSelectMenuOptionBuilder()
				.setLabel("English")
				.setValue("en")
				.setEmoji("🇬🇧"),
		]);

	return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
};

export const getLocationModal = () => {
	const modal = new ModalBuilder()
		.setCustomId("locationModal")
		.setTitle("Ustaw swoją domyślną lokację");
	const locationInputInit = new TextInputBuilder()
		.setCustomId("locationInput")
		.setLabel("Podaj domyślną lokację")
		.setStyle(TextInputStyle.Short);

	const locationInput =
		new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
			locationInputInit,
		);

	return modal.addComponents(locationInput);
};

export const getDailyNotificationsModal = (userHaveSavedLocation: boolean) => {
	const modal = new ModalBuilder()
		.setCustomId("dailyNotificationsModal")
		.setTitle("Ustaw powiadomienia dzienne");
	const dailyNotificationInputInit = new TextInputBuilder()
		.setCustomId("dailyNotificationsInput")
		.setLabel("Podaj godzinę otrzymywania powiadomienia")
		.setStyle(TextInputStyle.Short)
		.setMinLength(5)
		.setMaxLength(5)
		.setValue("08:30")
		.setRequired(true);

	const locationInputInit = new TextInputBuilder()
		.setCustomId("locationInput")
		.setLabel("Podaj domyślną lokację")
		.setStyle(TextInputStyle.Short)
		.setRequired(!userHaveSavedLocation);

	const dailyNotificationInput =
		new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
			dailyNotificationInputInit,
		);

	modal.addComponents(dailyNotificationInput);

	if (!userHaveSavedLocation) {
		const locationInput =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				locationInputInit,
			);

		modal.addComponents(locationInput);
	}

	return modal;
};
