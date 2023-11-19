import { EmbedBuilder } from "discord.js";
import { t } from "i18next";
import { AirConditionData } from "../types/AirConditionMessage";

const dateIcon =
	"https://cdn3.iconfinder.com/data/icons/map-pins-v-2/512/map_pin_time_clock_destination_location_planification-512.png";

const errorIcon =
	"https://static-00.iconduck.com/assets.00/process-error-symbolic-icon-2048x2048-oqfn9h3m.png";

const checkCompartment = (airQuality: number): string => {
	const compartments: [number, number, string][] = [
		[0, 50, "good"],
		[51, 100, "moderate"],
		[101, 150, "unhealthy_for_sensitive_groups"],
		[151, 200, "unhealthy"],
		[201, 300, "very_unhealthy"],
		[301, 500, "hazardous"],
		[501, 1000, "death"],
	];

	for (const [start, end, compartment] of compartments) {
		if (airQuality >= start && airQuality <= end) {
			return compartment;
		}
	}
	return "";
};

const checkColorForCompartment = (compartment: string): number => {
	const colors = new Map([
		["good", 0x00f11c],
		["moderate", 0xffd000],
		["unhealthy_for_sensitive_groups", 0xff8c00],
		["unhealthy", 0xff0000],
		["very_unhealthy", 0x8f3f97],
		["hazardous", 0x7e0023],
		["death", 0x000000],
	]);

	return colors.get(compartment) ?? 0x000000;
};

const checkThumbnailForCompartment = (compartment: string): string => {
	const thumbnails = new Map([
		[
			"good",
			"https://cdn.discordapp.com/attachments/573981806513094708/1173074441035591812/good-1.png?ex=6562a1b5&is=65502cb5&hm=839b7ad9e3f61d3b5796c119acb1bb850fb9311848d248e2dfaf15c13191907c&",
		],
		[
			"moderate",
			"https://cdn.discordapp.com/attachments/573981806513094708/1173199764809068544/moderate.png?ex=6563166c&is=6550a16c&hm=cdd6417346754b3248adae5584ba5de0ab1fc96b4f3002bd76ed90573557582a&",
		],
		[
			"unhealthy_for_sensitive_groups",
			"https://cdn.discordapp.com/attachments/573981806513094708/1173200553384345672/unhealthy.png?ex=65631728&is=6550a228&hm=124ec47ab2dee094d809f77962b1acb0759cabbc26fe181b03c75e7ee73c19e1&",
		],
		[
			"unhealthy",
			"https://cdn.discordapp.com/attachments/573981806513094708/1173200553384345672/unhealthy.png?ex=65631728&is=6550a228&hm=124ec47ab2dee094d809f77962b1acb0759cabbc26fe181b03c75e7ee73c19e1&",
		],
		[
			"very_unhealthy",
			"https://cdn.discordapp.com/attachments/573981806513094708/1173200553157873797/very_unhealthy.png?ex=65631728&is=6550a228&hm=b7afbe86a8f47dbe65bdbaf5ae366ee063f2f89d2df1fe15300e85b5e668c2c9&",
		],
		[
			"hazardous",
			"https://cdn.discordapp.com/attachments/573981806513094708/1173200552897818714/hazardous.png?ex=65631728&is=6550a228&hm=ac98bdc3ada18f16ecd358bdef10dd8cc764abc1f9e5a5704390b144bcfbec4a&",
		],
		[
			"death",
			"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Skull-Icon.svg/2048px-Skull-Icon.svg.png",
		],
	]);

	return thumbnails.get(compartment) ?? "";
};

const formatData = (data: string) => {
	const [date, time] = data.split(" ");
	const [year, month, day] = date.split("-");
	const [hour, minute] = time.split(":");
	return `${day}.${month}.${year} ${hour}:${minute}`;
};

export const embedTemplate = (
	title: string,
	description: string,
	color = 15277667,
) => {
	return new EmbedBuilder()
		.setColor(color)
		.setTitle(title)
		.setDescription(description);
};

export const airqualityEmbedTemplate = (airContition: AirConditionData) => {
	const qualityString = checkCompartment(airContition.aqi as any as number);
	const titleQuality = t(`get.message.quality.${qualityString}`).toUpperCase();
	const color = checkColorForCompartment(qualityString);
	return new EmbedBuilder()
		.setTitle(
			t("get.message.title", {
				airquality: titleQuality,
			}),
		)
		.setDescription(
			t("get.message.description.info", { aqi: airContition.aqi }) +
				t(`get.message.description.${qualityString}`),
		)
		.setThumbnail(checkThumbnailForCompartment(qualityString))
		.setColor(color)
		.setFooter({
			text: `${airContition.station.name}, ${formatData(
				airContition.time.stime,
			)}`,
			iconURL: dateIcon,
		});
};

export const errorAirqualityEmbedTemplate = (target: string) => {
	return new EmbedBuilder()
		.setTitle(t("get.message.error.title"))
		.setDescription(
			t("get.message.error.description", {
				target: target,
			}),
		)
		.setThumbnail(errorIcon)
		.setColor(0xff0000);
};

export const errorLocationNotSetEmbedTemplate = () =>
	new EmbedBuilder()
		.setTitle(t("get.message.warn.locationNotSet.title"))
		.setDescription(t("get.message.warn.locationNotSet.description"))
		.setThumbnail(errorIcon)
		.setColor(0xffd000);
