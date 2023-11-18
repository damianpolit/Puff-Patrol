const get = {
	name: "jakość",
	description:
		"Wyswietl informacje o jakosci powietrza na podstawie miasta / słowa kluczowego",
	option: {
		target: {
			name: "miasto",
			description: "nazwa miasta / słowo kluczowe",
		},
	},

	message: {
		title: "Jakość powietrza - **{{airquality}}**",
		description: {
			info: "・Poziom zanieczyszczenia: **{{aqi}}**\n\n*",
			good: "*0-50**: Aktualne powietrze nie stwarza zagrożenia zdrowia i życia. Miłego dnia!\n",
			moderate:
				"*51-100**: Aktualne powietrze może stwarzać zagrożenie dla osób wrażliwych. Uważaj!\n",
			unhealthy_for_sensitive_groups:
				"*101-150**: Aktualne powietrze stwarza zagrożenie dla osób wrażliwych. Uważaj!\n",
			unhealthy:
				"*151-200**: Aktualne powietrze stwarza zagrożenie dla wszystkich. Uważaj!\n",
			very_unhealthy:
				"*201-300**: Aktualne powietrze stwarza zagrożenie dla wszystkich. Uważaj!\n",
			hazardous:
				"*301-500**: Aktualne powietrze stwarza zagrożenie dla wszystkich. Uważaj!\n",
			death: "*501-1000**: Prawdopodobnie umierasz.\n",
		},
		quality: {
			good: "Dobra",
			moderate: "Umiarkowana",
			unhealthy_for_sensitive_groups: "Niezdrowa dla wrażliwych osób",
			unhealthy: "Niezdrowa",
			very_unhealthy: "Bardzo niezdrowa",
			hazardous: "Zagrażająca życiu",
			death: "Śmierć",
		},
		error: {
			title: "Błąd",
			description:
				"Nie znaleziono informacji o jakości powietrza dla **{{target}}**. Upewnij się, że podałeś poprawną nazwę miasta lub słowo kluczowe.",
		},
		warn: {
			title: "Uwaga",
			description:
				"Nie ustawiono domyślnej lokalizacji. Ustaw ją za pomocą komendy `/ustawienia` lub podaj nazwę miasta / słowo kluczowe jako parametr komendy `/jakość`.",
		},
	},
};

export default get;
