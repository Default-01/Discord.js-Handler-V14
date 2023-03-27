const { Client, CommandInteraction, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'returns websocket ping',
	enabled: false,
	options: [],

	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {CommandInteractionOptionResolver} args
	 */

	run: async (client, interaction, args) => {
		interaction.reply({ ephemeral: false, content: `${client.ws.ping}ms!` });
	},
};
