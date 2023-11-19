import { Guild } from "discord.js";
import { guildCreate } from "../../src/events/onGuildCreate";
import { addServerToDatabase } from "../../src/modules/serverModule";

jest.mock("../src/modules/serverModule", () => ({
	addServerToDatabase: jest.fn(),
}));

describe("guildCreate", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should call addServerToDatabase with the correct guild", async () => {
		const mockGuild = {} as Guild;
		await guildCreate(mockGuild);

		expect(addServerToDatabase).toHaveBeenCalledWith(mockGuild);
	});

	it("should log a success message when addServerToDatabase is successful", async () => {
		const mockGuild = {} as Guild;
		await guildCreate(mockGuild);

		expect(console.log).toHaveBeenCalledWith(
			"Bot has join to server, saved to db",
		);
	});

	it("should log an error message when addServerToDatabase throws an error", async () => {
		const mockError = new Error("Database error");
		(addServerToDatabase as jest.Mock).mockRejectedValueOnce(mockError);

		const mockGuild = {} as Guild;
		await guildCreate(mockGuild);

		expect(console.log).toHaveBeenCalledWith("error: ", mockError);
	});
});
