import axios from "axios";
import { AirConditionMessage } from "../types/AirConditionMessage";

export const getAirConditionByName = async (keyword: string) => {
	const token = process.env.AC_TOKEN;

	const formattedKeyword = keyword.trim().replace(" ", "%20");

	const url = `${process.env.AC_BASE_PATH}/search/?keyword=${formattedKeyword}&token=${token}`;

	try {
		//AirConditionMessage
		return (await axios.get(url)).data as AirConditionMessage;
	} catch (error) {
		console.error(error);
		return undefined;
	}
};
