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

		// Autocomplete Handling
		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			const cmd = client.slashCommands.get(interaction.commandName);
			if (!cmd) return;
			interaction.member = await interaction.guild.members.fetch(interaction.user.id);
			cmd.autocomplete(client, interaction, interaction.options);
		}

		// Modal Handling
		if (interaction.type === InteractionType.ModalSubmit) {
			const modal = client.modals.find((m) => interaction.customId.startsWith(m.customId));
			if (modal) {
				const args = interaction.customId.slice(modal.customId.length + 1).split('_');
				modal.run(client, interaction, interaction.fields, args);
			}
		}

		// Component Handling
		if (interaction.type === InteractionType.MessageComponent) {
			const component = client.components.find((c) => interaction.customId.startsWith(c.customId));
			if (component) {
				const args = interaction.customId.slice(component.customId.length + 1).split('_');
				component.run(client, interaction, args);
			}
		}

		// Context Menu Handling
		if (interaction.commandType === ApplicationCommandType.Message || interaction.commandType === ApplicationCommandType.User) {
			const menu = client.contextMenus.get(interaction.commandName);
			if (menu) menu.run(client, interaction);
		}
	},
};
