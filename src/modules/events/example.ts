import { BotEvent } from '../../types/client.types';
import { Client, Events } from 'discord.js';

export const event: BotEvent = {
	enabled: false,
	name: 'example',
	type: Events.ClientReady,
	once: true,

	run: (client: Client) => {
		console.log(`Logged in as ${client.user?.username}!`);
	},
};
