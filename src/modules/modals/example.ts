import type { BotModal } from '../../types/bot.types';

export default {
	enabled: true,
	customId: 'example',

	run: async (client, interaction, fields) => {
		await interaction.reply({
			content: 'Example Modal',
		});
	},
} satisfies BotModal;
