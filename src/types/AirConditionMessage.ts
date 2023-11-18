export interface AirConditionTime {
	vtime: number;
	stime: string;
	tz: string;
}

export interface AirConditionStation {
	name: string;
	geo: number[];
	url: string;
	country: string;
}

export interface AirConditionData {
	uid: string;
	aqi: string;
	time: AirConditionTime;
	station: AirConditionStation;
}

export interface AirConditionMessage {
	status: "ok" | "error";
	data: AirConditionData[];
}
