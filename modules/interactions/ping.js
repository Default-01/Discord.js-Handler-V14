const { Client, CommandInteraction, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'returns websocket ping',
	type: ApplicationCommandType.ChatInput,
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {Object} args
	 */
	run: async (client, interaction, args) => {
		interaction.followUp({ content: `${client.ws.ping}ms!` });
	},
};
