import { ActivityType, type ApplicationCommandDataResolvable, ApplicationCommandType, Events, InteractionType } from 'discord.js';
import type { BotCommand, BotComponent, BotContext, BotEvent, BotInterval, BotModal } from '../types/bot.types';
import { readdir } from 'node:fs/promises';
import { Logger } from './utils';
import bot from '../bot';

export default async function handler() {
	// load modules at the same time
	await Promise.all([loadEvents(), loadCommands(), loadComponents(), loadContexts(), loadModals(), loadIntervals()]);
	// login to the bot client
	await bot.login(bot.config.bot_token).catch((err) => {
		Logger({ level: 'ERROR', module: 'HANDLER', message: err.message });
		process.exit(1);
	});
	// on bot ready
	bot.once(Events.ClientReady, async () => {
		Logger({ level: 'SUCCESS', message: `Bot logged in as ${bot.user?.username}` });
		// set bot presence
		bot.user?.setPresence({
			status: bot.config.bot_presence.status ?? 'online',
			activities: [
				{
					name: bot.config.bot_presence.name ?? '',
					type: bot.config.bot_presence?.type ? ActivityType[bot.config.bot_presence?.type] : undefined,
				},
			],
		});
		// set username
		if (bot.config.bot_presence.username) bot.user?.setUsername(bot.config.bot_presence.username).catch(() => {});
		// merge commands and contexts
		const applicationCommands = [...bot.commands.values(), ...bot.contexts.values()] as unknown as ApplicationCommandDataResolvable[];
		// Register all commands
		await bot.application?.commands.set(applicationCommands);
		Logger({ level: 'INFO', message: `Registered ${bot.commands.size} command(s) and ${bot.contexts.size} context menu(s)` });
	});
	// Listen for the interactionCreate event
	bot.on(Events.InteractionCreate, async (interaction) => {
		switch (interaction.type) {
			// Handle Application Commands
			case InteractionType.ApplicationCommand: {
				const command = bot.commands.get(interaction.commandName) || bot.contexts.get(interaction.commandName);
				if (!command) return;
				if (interaction.commandType === ApplicationCommandType.ChatInput) return (command as BotCommand).run(bot, interaction, interaction.options);
				return (command as BotContext).run(bot, interaction);
			}
			// Handle Application Command Autocomplete
			case InteractionType.ApplicationCommandAutocomplete: {
				const command = bot.commands.get(interaction.commandName);
				if (!command) return;
				return command.autocomplete(interaction);
			}
			// Handle Message Components
			case InteractionType.MessageComponent: {
				const component = bot.components.find((component) => interaction.customId.startsWith(component.customId));
				if (!component) return;
				return component.run(bot, interaction, interaction.customId.slice(component.customId.length + 1).split('_'));
			}
			// Handle Modal Submits
			case InteractionType.ModalSubmit: {
				const modal = bot.modals.find((modal) => interaction.customId.startsWith(modal.customId));
				if (!modal) return;
				return modal.run(bot, interaction, interaction.fields);
			}
			default: {
				break;
			}
		}
	});
}

const loadEvents = async () => {
	const eventFiles = await readdir('./src/modules/events');
	// loop through all the files in the events folder
	for (const file of eventFiles) {
		// require the event file
		const eventfile = await import(`../modules/events/${file}`);
		const { default: event } = eventfile as { default: BotEvent };
		if (!event || !event.enabled) continue;
		// if the event is enabled, add it to the client
		if (event.once) bot.once(event.type, event.run);
		else bot.on(event.type, event.run);
		// add the event to the client
		bot.events.set(event.name, event);
	}
	// log the number of events loaded
	if (bot.events.size) Logger({ level: 'HANDLER', message: `Loaded ${bot.events.size} event(s)` });
};

const loadCommands = async () => {
	const commandFiles = await readdir('./src/modules/commands');
	// loop through all the files in the commands folder
	for (const file of commandFiles) {
		// require the command file
		const commandfile = await import(`../modules/commands/${file}`);
		const { default: command } = commandfile as { default: BotCommand };
		if (!command || !command.enabled) continue;
		// add the command to the client
		bot.commands.set(command.name, command);
	}
	// log the number of commands loaded
	if (bot.commands.size) Logger({ level: 'HANDLER', message: `Loaded ${bot.commands.size} command(s)` });
};

const loadComponents = async () => {
	const componentFiles = await readdir('./src/modules/components');
	// loop through all the files in the components folder
	for (const file of componentFiles) {
		// require the component file
		const componentfile = await import(`../modules/components/${file}`);
		const { default: component } = componentfile as { default: BotComponent };
		if (!component || !component.enabled) continue;
		// add the component to the client
		bot.components.set(component.customId, component);
	}
	// log the number of components loaded
	if (bot.components.size) Logger({ level: 'HANDLER', message: `Loaded ${bot.components.size} component(s)` });
};

const loadContexts = async () => {
	const contextFiles = await readdir('./src/modules/contexts');
	// loop through all the files in the contexts folder
	for (const file of contextFiles) {
		// require the context file
		const contextfile = await import(`../modules/contexts/${file}`);
		const { default: context } = contextfile as { default: BotContext };
		if (!context || !context.enabled) continue;
		// add the context to the client
		bot.contexts.set(context.name, context);
	}
	// log the number of contexts loaded
	if (bot.contexts.size) Logger({ level: 'HANDLER', message: `Loaded ${bot.contexts.size} context(s)` });
};

const loadModals = async () => {
	const modalFiles = await readdir('./src/modules/modals');
	// loop through all the files in the modals folder
	for (const file of modalFiles) {
		// require the modal file
		const modalfile = await import(`../modules/modals/${file}`);
		const { default: modal } = modalfile as { default: BotModal };
		if (!modal || !modal.enabled) continue;
		// add the modal to the client
		bot.modals.set(modal.customId, modal);
	}
	// log the number of modals loaded
	if (bot.modals.size) Logger({ level: 'HANDLER', message: `Loaded ${bot.modals.size} modal(s)` });
};

const loadIntervals = async () => {
	const intervalFiles = await readdir('./src/modules/intervals');
	// loop through all the files in the intervals folder
	for (const file of intervalFiles) {
		// require the interval file
		const intervalfile = await import(`../modules/intervals/${file}`);
		const { default: interval } = intervalfile as { default: BotInterval };
		if (!interval || !interval.enabled) continue;

		if (interval.immediate && !interval.once) interval.run(bot);
		if (interval.once) interval.run(bot);
		else setInterval(interval.run, interval.interval, bot);
		// add the interval to the client
		bot.intervals.set(interval.name, interval);
	}
	// log the number of intervals loaded
	if (bot.intervals.size) Logger({ level: 'HANDLER', message: `Loaded ${bot.intervals.size} interval(s)` });
};
