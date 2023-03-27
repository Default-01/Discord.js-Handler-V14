const { ModalSubmitInteraction, ModalSubmitFields } = require('discord.js');

module.exports = {
	customId: 'testModal',
	enabled: false,

	/**
	 * @param {Client} client
	 * @param {ModalSubmitInteraction} interaction
	 * @param {ModalSubmitFields} fields
	 */

	run: async (client, interaction, fields) => {
		// defer modal
		await interaction.deferUpdate().catch(() => {});
		// Execute code once modal is submitted
		console.log(fields);
	},
};
