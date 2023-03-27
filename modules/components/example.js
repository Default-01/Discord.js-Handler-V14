const { MessageComponentInteraction, Client } = require('discord.js');

module.exports = {
	customId: 'testcomponent',
	enabled: false,

	/**
	 * @param {Client} client
	 * @param {MessageComponentInteraction} interaction
	 */

	run: async (client, interaction) => {
		// defer modal
		await interaction.deferUpdate().catch(() => {});
		// Execute code once component is used
	},
};
