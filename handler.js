const { Client, ApplicationCommandType } = require('discord.js');
const term = require('terminal-kit').terminal;
const { promisify } = require('util');
const config = require('./config');
const { glob } = require('glob');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Events
	const eventFiles = await globPromise(`${process.cwd()}/modules/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(`${process.cwd()}/modules/interactions/*.js`);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if ([ApplicationCommandType.Message, ApplicationCommandType.User].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});
	client.on('ready', async () => {
		// Register for a single guild
		await client.guilds.cache.get(config.guildId).commands.set(arrayOfSlashCommands);

		term(`[^G INFO^ ] Successfully registered ${arrayOfSlashCommands.length} slash commands & ${eventFiles.length} events\n`);

		// Register for all the guilds the bot is in
		// await client.application.commands.set(arrayOfSlashCommands);
	});
};
