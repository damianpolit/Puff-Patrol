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
import { t } from "i18next";

export const getSettingsEmbed = () => {
	return new EmbedBuilder()
		.setTitle(t("settings.name"))
		.setDescription(t("settings.description"))
		.setColor(0x00ffff)
		.setThumbnail(
			"https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png",
		);
};

export const getSettingsSelectMenu = (isAdmin: boolean) => {
	const select = new StringSelectMenuBuilder()
		.setCustomId("settings_select")
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel(t("settings.selectMenuOptions.location.label"))
				.setDescription(t("settings.selectMenuOptions.location.description"))
				.setValue("location")
				.setEmoji("✅"),
			new StringSelectMenuOptionBuilder()
				.setLabel(t("settings.selectMenuOptions.dailyNotifications.label"))
				.setDescription(
					t("settings.selectMenuOptions.dailyNotifications.description"),
				)
				.setValue("daily_notifications")
				.setEmoji("⏰"),
		);
	if (isAdmin) {
		select.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel(t("settings.selectMenuOptions.serverLanguage.label"))
				.setDescription(
					t("settings.selectMenuOptions.serverLanguage.description"),
				)
				.setValue("server_language")
				.setEmoji("🌐"),
		);
	}

	return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
};

export const languageSelectMenu = () => {
	const select = new StringSelectMenuBuilder()
		.setCustomId("serverLanguageSelectMenu")
		.setPlaceholder(t("settings.languageSelectMenu.placeholder"))
		.addOptions([
			new StringSelectMenuOptionBuilder()
				.setLabel(t("settings.languageSelectMenu.options.polish.label"))
				.setValue("pl")
				.setEmoji("🇵🇱"),

			new StringSelectMenuOptionBuilder()
				.setLabel(t("settings.languageSelectMenu.options.english.label"))
				.setValue("en")
				.setEmoji("🇬🇧"),
		]);

	return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
};

export const getLocationModal = () => {
	const modal = new ModalBuilder()
		.setCustomId("locationModal")
		.setTitle(t("settings.locationModal.title"));
	const locationInputInit = new TextInputBuilder()
		.setCustomId("locationInput")
		.setLabel(t("settings.locationModal.input.label"))
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
		.setTitle(t("settings.dailyNotificationsModal.title"));
	const dailyNotificationInputInit = new TextInputBuilder()
		.setCustomId("dailyNotificationsInput")
		.setLabel(t("settings.dailyNotificationsModal.input.label"))
		.setStyle(TextInputStyle.Short)
		.setMinLength(5)
		.setMaxLength(5)
		.setValue("08:30")
		.setRequired(true);

	const locationInputInit = new TextInputBuilder()
		.setCustomId("locationInput")
		.setLabel(t("settings.dailyNotificationsModal.input.label"))
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
