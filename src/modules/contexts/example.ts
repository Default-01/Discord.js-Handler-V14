import { ApplicationCommandType } from 'discord.js';
import type { BotContext } from '../../types/bot.types';

export default {
	enabled: true,
	name: 'example',
	type: ApplicationCommandType.User,

	run: async (client, interaction) => {
		await interaction.reply({
			ephemeral: true,
			content: 'Example Context Menu',
		});
	},
} satisfies BotContext;
