import { ApplicationCommandOptionData, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, Client, Collection, CommandInteractionOptionResolver, Events, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';
import { BotConfig } from './config.types';

// The global variables for the bot
export interface BotCommand {
	enabled: boolean;
	name: string;
	description: string;
	options: ApplicationCommandOptionData[];
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	run: (client: Client, interaction: ChatInputCommandInteraction, args: CommandInteractionOptionResolver) => Promise<void>;
}

export interface BotEvent {
	enabled: boolean;
	name: string;
	type: string;
	once: boolean;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	run: (...args: any) => void;
}

export interface BotContext {
	enabled: boolean;
	name: string;
	type: number;
	run: (client: Client, interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction) => void;
}

export interface BotComponent {
	customId: string;
}

export interface BotModal {
	customId: string;
}

declare module 'discord.js' {
	export interface Client {
		config: BotConfig;
		slashCommands: Collection<string, BotCommand>;
		events: Collection<string, BotEvent>;
		contexts: Collection<string, BotContext>;
		components: Collection<string, BotComponent>;
		modals: Collection<string, BotModal>;
	}
}

export interface ClientCommand {
	name: string;
	description: string;
	options: ApplicationCommandOptionData[];
	type: number;
}
