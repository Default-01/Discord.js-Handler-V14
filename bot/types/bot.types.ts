import type { Knex } from 'knex';
import type { BotConfig } from '../schemas/config';
import type {
	Client,
	Collection,
	ModalSubmitFields,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	ApplicationCommandOptionData,
	CommandInteractionOptionResolver,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
	MessageComponentInteraction,
	ModalSubmitInteraction,
	CacheType,
	ApplicationCommandType,
} from 'discord.js';

// The global variables for the bot
export interface BotCommand {
	enabled: boolean;
	name: string;
	description: string;
	/**
	 * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
	 */
	default_member_permissions?: string | number;
	nsfw?: boolean;
	dm_permission?: boolean;
	options: ApplicationCommandOptionData[];
	autocomplete: (interaction: AutocompleteInteraction) => void;
	run: (client: Client, interaction: ChatInputCommandInteraction, options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>) => void;
}

export interface BotEvent {
	enabled: boolean;
	name: string;
	type: string;
	once: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	run: (...args: any) => void;
}

export interface BotContext {
	enabled: boolean;
	name: string;
	type: ApplicationCommandType;
	run: (client: Client, interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction) => void;
}

export interface BotComponent {
	enabled: boolean;
	customId: string;
	run: (client: Client, interaction: MessageComponentInteraction, options: string[]) => void;
}

export interface BotModal {
	enabled: boolean;
	customId: string;
	run: (client: Client, interaction: ModalSubmitInteraction, fields: ModalSubmitFields) => void;
}

export interface BotInterval {
	enabled: boolean;
	name: string;
	interval: number;
	run: (client: Client) => void;
}

declare module 'discord.js' {
	export interface Client {
		config: BotConfig;
		commands: Collection<string, BotCommand>;
		components: Collection<string, BotComponent>;
		contexts: Collection<string, BotContext>;
		events: Collection<string, BotEvent>;
		intervals: Collection<string, BotInterval>;
		modals: Collection<string, BotModal>;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		db: Knex<any, unknown[]>;
	}
}
