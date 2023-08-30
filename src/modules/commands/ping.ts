import { BotCommand } from '../../types/client.types';

export const command: BotCommand = {
	enabled: true,
	name: 'ping',
	description: 'Returns the bots ping',
	options: [],

	autocomplete: (interaction) => {},
	run: async (client, interaction, args) => {
		await interaction.reply(`Pong! ${client.ws.ping}ms`);
	},
};
