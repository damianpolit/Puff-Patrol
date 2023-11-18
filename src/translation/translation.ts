import i18next from "i18next";
import en from "./en/en";
import pl from "./pl/pl";

i18next.init({
	lng: "pl",
	fallbackLng: "pl",
	resources: {
		en: {
			translation: en,
		},
		pl: {
			translation: pl,
		},
	},
});

export default i18next;
