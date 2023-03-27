const { Client, CommandInteraction, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'example',
	type: ApplicationCommandType.User,
	enabled: false,

	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */

	run: async (client, interaction) => {
		interaction.reply({ ephemeral: true, content: `${client.ws.ping}ms!` });
	},
};
