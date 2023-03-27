const { ApplicationCommandType, InteractionType, Events } = require('discord.js');
const client = require('../../index');

module.exports = {
	name: 'interactionHandler',
	event: Events.InteractionCreate,
	once: false,

	run: async (interaction) => {
		// Slash Command Handling
		if (interaction.commandType === ApplicationCommandType.ChatInput) {
			const cmd = client.slashCommands.get(interaction.commandName);
			if (!cmd) return interaction.reply({ ephemeral: true, content: 'An error has occurred ' });
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
			cmd.run(client, interaction, interaction.options);
		}

		// Modal Handling
		if (interaction.type === InteractionType.ModalSubmit) {
			const modal = client.modals.get(interaction.customId);
			if (modal) modal.run(client, interaction, interaction.fields);
		}

		// Component Handling
		if (interaction.type === InteractionType.MessageComponent) {
			const component = client.components.get(interaction.customId);
			if (component) component.run(client, interaction);
		}

		// Context Menu Handling
		if (interaction.commandType === ApplicationCommandType.Message || interaction.commandType === ApplicationCommandType.User) {
			const menu = client.contextMenus.get(interaction.commandName);
			if (menu) menu.run(client, interaction);
		}
	},
};
