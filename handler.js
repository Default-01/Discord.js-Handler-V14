const { glob } = require("glob");
const { promisify } = require("util");
const { Client, ApplicationCommandType } = require("discord.js");
const config = require('./config');
const term = require('terminal-kit').terminal;

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Commands
	const commandFiles = await globPromise(`${process.cwd()}/modules/commands/*.js`);
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split("/");
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	});

	// Events
	const eventFiles = await globPromise(`${process.cwd()}/modules/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(
		`${process.cwd()}/modules/interactions/*.js`
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if ([ApplicationCommandType.Message, ApplicationCommandType.User].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});
	client.on("ready", async () => {
		// Register for a single guild
		await client.guilds.cache
			.get(config.guildId)
			.commands.set(arrayOfSlashCommands);

		term(`[^G INFO^ ] Successfully registered ${arrayOfSlashCommands.length} slash commands\n`);

		// Register for all the guilds the bot is in
		// await client.application.commands.set(arrayOfSlashCommands);
	});
};
