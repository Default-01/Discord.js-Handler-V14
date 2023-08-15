const { Client } = require('discord.js');

module.exports = {
	name: 'example',
	enabled: false,
	interval: 1000 * 60,

	/**
	 *
	 * @param {Client} client
	 */
	run: async (client) => {
		console.log('This is an example interval');
	},
};
