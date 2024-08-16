import type { BotCommand } from '../../types/bot.types';

export default {
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
} satisfies BotCommand;
