import { BotComponent } from '@/types/client.types';

export const component: BotComponent = {
	enabled: false,
	customId: 'click_me',

	run: async (client, interaction, options) => {
		interaction.reply({
			ephemeral: true,
			content: 'Example Component',
		});
	},
};
