import { Client, Events } from 'discord.js';
import { BotEvent } from '../../types/client.types';

export const event: BotEvent = {
	enabled: true,
	name: 'clientReady',
	type: Events.ClientReady,
	once: true,

	run: (client: Client) => {
		console.log(`Logged in as ${client.user?.username}!`);
	},
};
