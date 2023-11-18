import { Command } from "../utils/Command";
import { get } from "./get";
import { settings } from "./settings/settings";

export const CommandList: Command[] = [get, settings];
