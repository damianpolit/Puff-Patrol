import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../utils/Command";
import i18next from "../translation/translation";
import {
	airqualityEmbedTemplate,
	errorAirqualityEmbedTemplate,
	errorLocationNotSetEmbedTemplate,
} from "../utils/EmbedTemplate";
import { getAirConditionByName } from "../api/airConditionApi";
import { getUserLocation } from "../modules/userSettingsModule";
import { AirConditionData } from "../types/AirConditionMessage";

export const get: Command = {
	data: new SlashCommandBuilder()
		.setName(i18next.t("get.name"))
		.setDescription(i18next.t("get.description"))
		.addStringOption((option) =>
			option
				.setName(i18next.t("get.option.target.name"))
				.setDescription(i18next.t("get.option.target.description"))
				.setRequired(false),
		),

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();
		let target: string = interaction.options.get(
			i18next.t("get.option.target.name"),
		)?.value as string;

		if (target === undefined) {
			const userSavedLocation = await getUserLocation(interaction.user.id);

			if (userSavedLocation === undefined) {
				await interaction.editReply({
					embeds: [errorLocationNotSetEmbedTemplate()],
				});
				return;
			}

			target = userSavedLocation;
		}

		const airquality = await getAirConditionByName(target);

		if (airquality === undefined || !airquality.data.length) {
			await interaction.editReply({
				embeds: [errorAirqualityEmbedTemplate(target)],
			});
			return;
		}

		const result = calculateAverageAqi(airquality.data);

		const embed = airqualityEmbedTemplate(result);
		await interaction.editReply({ embeds: [embed] });
	},
};

const calculateAverageAqi = (
	airConditionData: AirConditionData[],
): AirConditionData => {
	if (airConditionData.length === 1) {
		return airConditionData[0];
	}

	airConditionData = airConditionData.filter((data) => data.aqi !== "-");

	const avgSum = airConditionData.reduce((acc, curr) => {
		return (acc + curr.aqi) as any as number;
	}, 0);
	const avg = avgSum / airConditionData.length;

	let result = airConditionData[0];
	airConditionData.forEach((rec) => {
		const diff = Math.abs((rec.aqi as any as number) - avg);
		const resultDiff = Math.abs((rec.aqi as any as number) - avg);

		if (diff < resultDiff) {
			result = rec;
		}
	});

	return result;
};
