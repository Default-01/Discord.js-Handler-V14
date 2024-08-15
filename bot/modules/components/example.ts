import type { BotComponent } from '../../types/bot.types';

export default {
	enabled: true,
	customId: 'example_component',

	run: async (client, interaction, options) => {
		interaction.reply({
			ephemeral: true,
			content: 'Example Component',
		});
	},
} satisfies BotComponent;
