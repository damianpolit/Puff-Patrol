const settings = {
	command: {
		name: "settings",
		description: "Here you can change the bot settings.",
		options: {
			selectedTimeout: "No choice made within the specified time.",
		},
	},
	name: "Settings",
	description:
		"Choose the setting you would like to modify. If you don't see the expanded options bar, run the `/settings` command again. Depending on your permissions, the number of commands may vary.\n\nIf you would like to support the maintenance of the server that allows the bot to run 24/7, donate here: **https://ko-fi.com/anae_dev**",
	options: {
		selectedTimeout: "No choice made within the specified time.",
	},
	selectMenuOptions: {
		location: {
			label: "Set your location",
			description:
				"When you have your location set, you can use the /quality command without specifying a location.",
		},
		dailyNotifications: {
			label: "Set daily notifications",
			description:
				"Specify the time and place (default - location) from which the daily information should be sent.",
		},
		serverLanguage: {
			label: "Set the bot's language on the server. [ADMIN]",
			description: "Language settings for the bot.",
		},
	},
	languageSelectMenu: {
		placeholder: "Choose a language",
		options: {
			polish: {
				label: "Polish",
			},
			english: {
				label: "English",
			},
		},
	},
	locationModal: {
		title: "Set your default location",
		input: {
			label: "Enter your default location",
		},
	},
	dailyNotificationsModal: {
		title: "Set daily notifications",
		input: {
			label: "Enter the time to receive notifications",
		},
	},
};

export default settings;
