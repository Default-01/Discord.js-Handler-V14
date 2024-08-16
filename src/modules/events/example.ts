import { type Client, Events } from 'discord.js';
import type { BotEvent } from '../../types/bot.types';

export default {
	enabled: true,
	name: 'example',
	type: Events.ClientReady,
	once: true,

	run: (client: Client) => {
		console.log(`Logged in as ${client.user?.username}!`);
	},
} satisfies BotEvent;
