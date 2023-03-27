const { Client, Collection } = require('discord.js');

const client = new Client({
	intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.contextMenus = new Collection();
client.components = new Collection();
client.modals = new Collection();
client.config = require('./config');

// Initializing the project
require('./handler')(client);

// Catch exceptions and rejections
const ignore = [
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
	.on('unhandledRejection', async (reason) => {
		// log error if not in ignore list
		if (!ignore.includes(reason.toString())) console.error(reason, 'Unhandled Rejection');
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'Uncaught Exception');
	});

client.login(client.config.token);
