const get = {
	name: "airquality",
	description:
		"Display information about air quality based on the city/keyword.",
	option: {
		target: {
			name: "city",
			description: "city name/keyword",
		},
	},
	message: {
		title: "Air Quality - **{{airquality}}**",
		description: {
			info: "・Pollution level: **{{aqi}}**\n\n*",
			good: "*0-50**: Current air poses no threat to health and life. Have a nice day!\n",
			moderate:
				"*51-100**: Current air may pose a threat to sensitive individuals. Be cautious!\n",
			unhealthy_for_sensitive_groups:
				"*101-150**: Current air poses a threat to sensitive individuals. Be cautious!\n",
			unhealthy:
				"*151-200**: Current air poses a threat to everyone. Be cautious!\n",
			very_unhealthy:
				"*201-300**: Current air poses a threat to everyone. Be cautious!\n",
			hazardous:
				"*301-500**: Current air poses a threat to everyone. Be cautious!\n",
			death: "*501-1000**: You are probably dying.\n",
		},
		quality: {
			good: "Good",
			moderate: "Moderate",
			unhealthy_for_sensitive_groups: "Unhealthy for Sensitive Groups",
			unhealthy: "Unhealthy",
			very_unhealthy: "Very Unhealthy",
			hazardous: "Hazardous",
			death: "Death",
		},
		error: {
			title: "Error",
			description:
				"No air quality information found for **{{target}}**. Make sure you provided a valid city name or keyword.",
		},
		warn: {
			title: "Warning",
			description:
				"Default location is not set. Set it using the `/settings` command or provide the city name/keyword as a parameter to the `/airquality` command.",
		},
	},
};

export default get;
