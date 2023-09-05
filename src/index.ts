import { BotCommand, BotComponent, BotContext, BotEvent, BotModal } from './types/client.types';
import { Client, Collection, IntentsBitField } from 'discord.js';
import config from './config';

// Initialize the client
const client = new Client({
	intents: [IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
});

// Global variables
client.config = config;
client.slashCommands = new Collection<string, BotCommand>();
client.events = new Collection<string, BotEvent>();
client.contexts = new Collection<string, BotContext>();
client.components = new Collection<string, BotComponent>();
client.modals = new Collection<string, BotModal>();

export default client;
import './handlers';

// Catch exceptions and rejections
const ignore: string[] = [
	// 'Missing Access',
	// 'Unknown Message',
	// 'Missing Permissions',
	// 'failed, reason: read ECONNRESET',
	// 'Cannot send messages to this user',
	// "Cannot read property 'emoji' of undefined",
	// 'Response: Internal Server Error',
	// 'InteractionAlreadyReplied',
	// 'Invalid Webhook Token',
	// 'Unknown Channel',
	// 'socket hang up',
	// 'AbortError',
];

/**
 * Alter the string prototype to allow for easier placeholder replacement
 */
String.prototype.replacer = function (replaceData) {
	const keysWithBraces = Object.keys(replaceData).map((key) => `{${key}}`);
	const regex = new RegExp(keysWithBraces.join('|'), 'g');
	return this.replace(regex, (match) => {
		const keyWithoutBraces = match.slice(1, -1); // Remove the curly braces
		return (replaceData[keyWithoutBraces] || match) as string;
	});
};

process
	.on('unhandledRejection', async (reason: string) => {
		// log error if not in ignore list
		if (!ignore.includes(reason.toString())) console.error(reason, 'Unhandled Rejection');
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'Uncaught Exception');
	});

// login with the client
client.login(client.config.token);
