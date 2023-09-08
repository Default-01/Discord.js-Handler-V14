import { BotModal } from '../../types/client.types';

export const modal: BotModal = {
	enabled: false,
	customId: 'example',

	run: async (client, interaction, fields) => {
		await interaction.reply({
			content: 'Example Modal',
		});
	},
};
