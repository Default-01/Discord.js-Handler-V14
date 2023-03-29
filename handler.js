const { Client, Events } = require('discord.js');
const term = require('terminal-kit').terminal;
const { promisify } = require('util');
const { glob } = require('glob');
const config = require('./config');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Events
	const eventFiles = await globPromise(`${process.cwd()}/modules/events/*.js`);
	eventFiles.map((event) => {
		const file = require(event);
		if (file.once) client.once(file.event, (...args) => file.run(...args));
		else client.on(file.event, (...args) => file.run(...args));
	});
	term(`[^B INFO^ ] Loaded ${eventFiles.length} event(s)\n`);

	// Modals
	const modalFiles = await globPromise(`${process.cwd()}/modules/modals/*.js`);
	modalFiles.map((value) => {
		const file = require(value);
		if (!file?.customId || file?.enabled === false) return;
		client.modals.set(file.customId, file);
	});
	term(`[^B INFO^ ] Loaded ${client.modals.size} modal(s)\n`);

	// Context Menus
	const contextMenuFiles = await globPromise(`${process.cwd()}/modules/contexts/*.js`);
	const arrayOfContextMenus = [];
	contextMenuFiles.map((value) => {
		const file = require(value);
		if (!file?.name || file?.enabled === false) return;
		client.contextMenus.set(file.name, file);
		arrayOfContextMenus.push(file);
	});
	term(`[^B INFO^ ] Loaded ${client.contextMenus.size} context menu(s)\n`);

	// Components
	const componentFiles = await globPromise(`${process.cwd()}/modules/components/*.js`);
	componentFiles.map((value) => {
		const file = require(value);
		if (!file?.customId || file?.enabled === false) return;
		client.components.set(file.customId, file);
	});
	term(`[^B INFO^ ] Loaded ${client.components.size} component(s)\n`);

	// Commands
	const slashCommands = await globPromise(`${process.cwd()}/modules/commands/*.js`);
	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name || file?.enabled === false) return;
		client.slashCommands.set(file.name, file);
		arrayOfSlashCommands.push(file);
	});

	// Register slash commands
	client.on(Events.ClientReady, async () => {
		// log client as ready
		term(`[^G READY^ ] ${client.user.tag} is now online!\n`);
		// merge context menus with slash commands
		let commands = arrayOfSlashCommands.concat(arrayOfContextMenus);
		// Register for a single guild
		await client.guilds.cache.get(config.guildId).commands.set(commands);
		// log registered commands
		term(`[^B INFO^ ] Registered ${arrayOfSlashCommands.length} command(s)\n`);

		// Register for all the guilds the bot is in
		// await client.application.commands.set(arrayOfSlashCommands);
	});
};
