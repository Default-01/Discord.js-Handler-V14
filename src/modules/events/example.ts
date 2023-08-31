import { Client, Events } from 'discord.js';
import { BotEvent } from '@/types/client.types';

export const event: BotEvent = {
	enabled: false,
	name: 'example',
	type: Events.ClientReady,
	once: true,

	run: (client: Client) => {
		console.log(`Logged in as ${client.user?.username}!`);
	},
};
