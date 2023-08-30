import { BotCommand, BotContext, BotEvent } from './types/client.types';
import { ApplicationCommandType, Client, Events } from 'discord.js';
import { promisify } from 'util';
import { glob } from 'glob';
import client from './index';

const globPromise = promisify(glob);

export const loadHandlers = async (client: Client) => {
	await eventHandler(client);
	await commandHandler(client);
	await contextHandler(client);
	registerCommands(client, [...client.slashCommands.values(), ...client.contexts.values()]);
};

const eventHandler = async (client: Client) => {
	// Get all event files
	const eventFiles = await globPromise(`${__dirname}/modules/events/**/*.ts`);
	eventFiles.map(async (value) => {
		const { event }: { event: BotEvent } = await import(value);
		if (!event.enabled || !event.name) return;
		event.once ? client.once(event.type, (...args) => event.run(...args)) : client.on(event.type, (...args) => event.run(...args));
	});
};

const commandHandler = async (client: Client) => {
	// Get all command files
	const commandFiles = await globPromise(`${__dirname}/modules/commands/**/*.ts`);
	for (const value of commandFiles) {
		const { command }: { command: BotCommand } = await import(value);
		if (!command.enabled || !command.name) return;
		command.type = ApplicationCommandType.ChatInput;
		client.slashCommands.set(command.name, command);
	}
};

const contextHandler = async (client: Client) => {
	// Get all context files
	const contextFiles = await globPromise(`${__dirname}/modules/contexts/**/*.ts`);
	for (const value of contextFiles) {
		const { context }: { context: BotContext } = await import(value);
		if (!context.enabled || !context.name) return;
		client.contexts.set(context.name, context);
	}
};

const registerCommands = async (client: Client, commands: Array<BotCommand | BotContext>) => {
	const guild = client.guilds.cache.get(client.config.guildId);
};
