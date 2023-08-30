import { BotCommand, BotComponent, BotContext, BotEvent, BotModal } from './types/client.types';
import { Client, Collection, IntentsBitField } from 'discord.js';
import { loadHandlers } from './handlers';
import config from './config.json';

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

// Catch exceptions and rejections
const ignore: string[] = [
	// 'Missing Permissions',
	// 'Unknown Message',
	// 'Missing Access',
	// "Cannot read property 'emoji' of undefined",
	// 'Cannot send messages to this user',
	// 'AbortError',
	// 'Unknown Channel',
	// 'socket hang up',
	// 'failed, reason: read ECONNRESET',
	// 'Response: Internal Server Error',
	// 'InteractionAlreadyReplied',
	// 'Invalid Webhook Token',
];

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

// Initialize the handlers
loadHandlers(client);
