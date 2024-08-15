import { Client, Collection, IntentsBitField, Partials } from 'discord.js';
import { ParseConfiguration, type BotConfig } from './schemas/config';
import InitDatabase from './lib/database';
import config from '../config.json';
import handler from './lib/handler';

// Create the bot instance
const bot = new Client({
	intents: [IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds],
	partials: [Partials.Message, Partials.GuildMember],
});

(async () => {
	// Parse configuration file
	const configurationResponse = ParseConfiguration(config);
	if (!configurationResponse) return;

	// Initialize database
	const database = await InitDatabase();
	if (!database) return;

	bot.config = config as BotConfig;
	bot.commands = new Collection();
	bot.events = new Collection();
	bot.contexts = new Collection();
	bot.components = new Collection();
	bot.modals = new Collection();
	bot.intervals = new Collection();
	bot.db = database;

	// Load handler
	handler();
})();

export default bot;
