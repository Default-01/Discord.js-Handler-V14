import { BotCommand } from '@/types/client.types';

export const command: BotCommand = {
	enabled: true,
	name: 'ping',
	description: 'Returns the bots ping',
	options: [],

	autocomplete: (interaction) => {},
	run: async (client, interaction, options) => {
		await interaction.reply({
			ephemeral: true,
			content: `Pong! ${client.ws.ping}ms`,
		});
	},
};
