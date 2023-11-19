const settings = {
	command: {
		name: "ustawienia",
		description: "Tutaj możesz zmienić ustawienia bota.",
		options: {
			selectedTimeout: "Nie dokonano wyboru w wyznaczonym czasie.",
		},
	},
	name: "Ustawienia",
	description:
		"Wybierz ustawienie, które chciałbyś zmodyfikować. Jeśli nie widzisz rozwijanego paska z opcjami, uruchom komende `/ustawienia` jeszcze raz. Zależnie od twoich uprawnień, ilość poleceń może się różnić. \n\nJeśli chcesz wesprzeć utrzymanie serwera, który pozwala działać botowi 24/7, wpłać dotację tutaj: **https://ko-fi.com/anae_dev**",
	options: {
		selectedTimeout: "Nie dokonano wyboru w wyznaczonym czasie.",
	},
	selectMenuOptions: {
		location: {
			label: "Ustaw swoją lokalizację",
			description:
				"Kiedy masz ustawioną lokalizację, możesz używać komendy /jakość bez podawania miejsca",
		},
		dailyNotifications: {
			label: "Ustaw powiadomienia dzienne",
			description:
				"Wskaż godzinę oraz miejsce (domyślnie - lokalizacja) z którego ma być wysyłana codzienna informacja.",
		},
		serverLanguage: {
			label: "Ustaw język bota na serwerze. [ADMIN]",
			description: "Ustawienia językowe dla bota.",
		},
	},
	languageSelectMenu: {
		placeholder: "Wybierz język",
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
		title: "Ustaw swoją domyślną lokację",
		input: {
			label: "Podaj domyślną lokację",
		},
	},
	dailyNotificationsModal: {
		title: "Ustaw powiadomienia dzienne",
		input: {
			label: "Podaj godzinę otrzymywania powiadomienia",
		},
	},
};

export default settings;
