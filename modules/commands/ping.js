const { Client, CommandInteraction, CommandInteractionOptionResolver, ComponentType, TextInputStyle } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'returns websocket ping',
	enabled: true,
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
