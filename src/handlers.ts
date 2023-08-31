import { BotCommand, BotComponent, BotContext, BotEvent, BotInterval, BotModal } from './types/client.types';
import { ApplicationCommandDataResolvable, ApplicationCommandType, Client, Events, InteractionType } from 'discord.js';
import { promisify } from 'util';
import { glob } from 'glob';
import client from './index';

const globPromise = promisify(glob);

// run all handlers
(async () => {
	await Promise.all([EventHandler(client), CommandHandler(client), ContextHandler(client), ComponentHandler(client), ModalHandler(client), IntervalHandler(client)]);
	RegisterCommands(client);
})();

async function EventHandler(client: Client) {
	let eventFiles = await globPromise(`${__dirname}/modules/events/**/*`);
	eventFiles = eventFiles.filter((value) => value.endsWith('.js') || value.endsWith('.ts'));
	eventFiles.map(async (value) => {
		const { event }: { event: BotEvent } = await import(value);
		if (!event.enabled || !event.name) return;
		event.once ? client.once(event.type, (...args) => event.run(...args)) : client.on(event.type, (...args) => event.run(...args));
	});
	console.log(`Loaded ${client.events.size} events`);
}

async function ComponentHandler(client: Client) {
	let componentFiles = await globPromise(`${__dirname}/modules/components/**/*`);
	componentFiles = componentFiles.filter((value) => value.endsWith('.js') || value.endsWith('.ts'));
	for (const value of componentFiles) {
		const { component }: { component: BotComponent } = await import(value);
		if (!component.enabled || !component.customId) return;
		client.components.set(component.customId, component);
	}
	console.log(`Loaded ${client.components.size} components`);
}

async function CommandHandler(client: Client) {
	let commandFiles = await globPromise(`${__dirname}/modules/commands/**/*`);
	commandFiles = commandFiles.filter((value) => value.endsWith('.js') || value.endsWith('.ts'));
	for (const value of commandFiles) {
		const { command }: { command: BotCommand } = await import(value);
		if (!command.enabled || !command.name) return;
		client.slashCommands.set(command.name, command);
	}
	console.log(`Loaded ${client.slashCommands.size} commands`);
}

async function ContextHandler(client: Client) {
	const contextFiles = await globPromise(`${__dirname}/modules/contexts/**/*`);
	for (const value of contextFiles) {
		const { context }: { context: BotContext } = await import(value);
		if (!context.enabled || !context.name) return;
		client.contexts.set(context.name, context);
	}
	console.log(`Loaded ${client.contexts.size} contexts`);
}

async function ModalHandler(client: Client) {
	const modalFiles = await globPromise(`${__dirname}/modules/modals/**/*`);
	for (const value of modalFiles) {
		const { modal }: { modal: BotModal } = await import(value);
		if (!modal.enabled || !modal.customId) return;
		client.modals.set(modal.customId, modal);
	}
	console.log(`Loaded ${client.modals.size} modals`);
}

async function IntervalHandler(client: Client) {
	let activeIntervals = 0;
	const intervalFiles = await globPromise(`${__dirname}/modules/intervals/**/*`);
	for (const value of intervalFiles) {
		const { interval }: { interval: BotInterval } = await import(value);
		if (!interval.enabled || !interval.name) return;
		interval.run(client);
		setInterval(() => interval.run(client), interval.interval);
		activeIntervals++;
	}
	console.log(`Loaded ${activeIntervals} intervals`);
}

async function RegisterCommands(client: Client) {
	const commands = client.slashCommands.map((command) => command);
	const contexts = client.contexts.map((context) => context);
	const mergedArray = [...commands, ...contexts];
	// Register commands
	client.on(Events.ClientReady, async () => {
		if (client.config.guildId) await client.guilds.cache.get(client.config.guildId)?.commands.set(mergedArray as ApplicationCommandDataResolvable[]);
		else await client.application?.commands.set(mergedArray as ApplicationCommandDataResolvable[]);
		console.log(`Registered ${commands.length} commands and ${contexts.length} context menus`);
	});
	// Handle interactions
	client.on(Events.InteractionCreate, async (interaction) => {
		// Handle Application Commands
		switch (interaction.type) {
			// Handle Application Commands
			case InteractionType.ApplicationCommand: {
				const command = client.slashCommands.get(interaction.commandName) || client.contexts.get(interaction.commandName);
				if (!command) return;
				if (interaction.commandType === ApplicationCommandType.ChatInput) return (command as BotCommand).run(client, interaction, interaction.options);
				else return (command as BotContext).run(client, interaction);
			}
			// Handle Application Command Autocomplete
			case InteractionType.ApplicationCommandAutocomplete: {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command) return;
				return command.autocomplete(interaction);
			}
			// Handle Message Components
			case InteractionType.MessageComponent: {
				const component = client.components.find((component) => interaction.customId.startsWith(component.customId));
				if (!component || interaction.message.author.id !== client.user?.id) return;
				return component.run(client, interaction, interaction.customId.slice(component.customId.length + 1).split('_'));
			}
			// Handle Modal Submits
			case InteractionType.ModalSubmit: {
				const modal = client.modals.find((modal) => interaction.customId.startsWith(modal.customId));
				if (!modal || interaction.message?.author.id !== client.user?.id) return;
				return modal.run(client, interaction, interaction.fields);
			}
			default: {
				break;
			}
		}
	});
}
