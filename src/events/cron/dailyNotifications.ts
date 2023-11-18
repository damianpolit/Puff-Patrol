import { log } from "console";
import {
	getAllEnabledDailyNotifications,
	getUserLocation,
	markNotificationAsSent,
} from "../../modules/userSettingsModule";
import { client } from "../../Bot";

export const checkIfDailyNotificationShouldBeSent = async () => {
	const users = await getAllEnabledDailyNotifications();
	log(users);
	users.forEach(async (user) => {
		const savedTime = user.dailyInformation.time;

		var shouldSentNotification = isTimeEarlierOrEqual(currentTime(), savedTime);

		log(shouldSentNotification);

		if (shouldSentNotification) {
			const userLocation = await getUserLocation(user.userId);
			const clientUser = await client.users.fetch(user.userId);
			if (userLocation) {
				clientUser.send(
					`Dzień dobry! Oto prognoza pogody dla Twojego miasta: ${userLocation}`,
				);
				markNotificationAsSent(user.userId);
			} else {
				clientUser.send(
					'Cześć! Wygląda na to, że masz włączone powiadomienia o jakości powietrza w twoim mieście, ale nie podałeś mi swojego miasta. Aby to zrobić, wpisz komendę `/ustawienia` i wybierz opcję "Lokalizacja". Miłego dnia!',
				);
			}
		}
	});
};

const currentTime = () =>
	new Date().toLocaleTimeString("en-US", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	});

const isTimeEarlierOrEqual = (
	currentTime: string,
	userSavedTime: string,
): boolean => {
	const [currentTimeHours, currentTimeMinutes] = currentTime
		.split(":")
		.map(Number);
	const [userSavedTimeHours, userSavedTimeMinutes] = userSavedTime
		.split(":")
		.map(Number);

	if (userSavedTimeHours < currentTimeHours) {
		return true;
	} else if (
		userSavedTimeHours === currentTimeHours &&
		userSavedTimeMinutes <= currentTimeMinutes
	) {
		return true;
	} else {
		return false;
	}
};
