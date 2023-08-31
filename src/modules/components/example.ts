import { ComponentType } from 'discord.js';
import { BotComponent } from '@/types/client.types';

export const component: BotComponent = {
	enabled: false,
	customId: 'click_me',
	type: ComponentType.Button,

	run: async (client, interaction, options) => {
		interaction.reply({
			ephemeral: true,
			content: 'Example Component',
		});
	},
};
