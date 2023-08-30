import { ApplicationCommandType } from 'discord.js';
import { BotContext } from '../../types/client.types';

export const context: BotContext = {
	enabled: true,
	name: 'example',
	type: ApplicationCommandType.User,

	run: async (client, interaction) => {
		await interaction.reply('Example Context Menu');
	},
};
