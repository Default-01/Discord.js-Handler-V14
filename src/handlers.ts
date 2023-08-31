import { BotCommand, BotContext, BotEvent } from './types/client.types';
import { ApplicationCommandDataResolvable, ApplicationCommandType, Client, Events } from 'discord.js';
import { promisify } from 'util';
import { glob } from 'glob';
import client from './index';

const globPromise = promisify(glob);

// run all handlers
(async () => {
	await EventHandler(client);
	await commandHandler(client);
	await contextHandler(client);
	await registerCommands(client, [...client.slashCommands.values(), ...client.contexts.values()]);
})();

async function EventHandler(client: Client) {
	// Get all event files
	const eventFiles = await globPromise(`${__dirname}/modules/events/**/*.ts`);
	eventFiles.map(async (value) => {
		const { event }: { event: BotEvent } = await import(value);
		if (!event.enabled || !event.name) return;
		event.once ? client.once(event.type, (...args) => event.run(...args)) : client.on(event.type, (...args) => event.run(...args));
	});
	console.log(`Loaded ${eventFiles.length} events`);
}

async function commandHandler(client: Client) {
	// Get all command files
	const commandFiles = await globPromise(`${__dirname}/modules/commands/**/*.ts`);
	for (const value of commandFiles) {
		const { command }: { command: BotCommand } = await import(value);
		if (!command.enabled || !command.name) return;
		command.type = ApplicationCommandType.ChatInput;
		client.slashCommands.set(command.name, command);
	}
	console.log(`Loaded ${commandFiles.length} commands`);
}

async function contextHandler(client: Client) {
	// Get all context files
	const contextFiles = await globPromise(`${__dirname}/modules/contexts/**/*.ts`);
	for (const value of contextFiles) {
		const { context }: { context: BotContext } = await import(value);
		if (!context.enabled || !context.name) return;
		client.contexts.set(context.name, context);
	}
	console.log(`Loaded ${contextFiles.length} contexts`);
}

async function registerCommands(client: Client, commands: ApplicationCommandDataResolvable[]) {
	console.log(commands);
	const guild = client.guilds.cache.get(client.config.guildId);
	if (guild) await guild?.commands.set(commands);
}
