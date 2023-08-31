import { ApplicationCommandType } from 'discord.js';
import { BotContext } from '@/types/client.types';

export const context: BotContext = {
	enabled: false,
	name: 'example',
	type: ApplicationCommandType.User,

	run: async (client, interaction) => {
		await interaction.reply({
			ephemeral: true,
			content: 'Example Context Menu',
		});
	},
};
