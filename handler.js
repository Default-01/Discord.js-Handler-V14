const client = require('../../index');
const { ApplicationCommandOptionType, ApplicationCommandType } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
	// Slash Command Handling
	if (interaction.commandType === ApplicationCommandType.ChatInput) {
		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd) return interaction.reply({ ephemeral: true, content: 'An error has occurred ' });

		let args = { options: {} };

		for (let option of interaction.options.data) {
			if (option.type === ApplicationCommandOptionType.Subcommand) {
				args.name = option.name;
				option.options?.map((x) => {
					args.options[x.name] = x.value;
				});
			} else if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
				option.options?.map((x) => {
					args.name = x.name;
					args.options[x.name] = {};
					x.options?.map((y) => {
						args.options[x.name][y.name] = y.value;
					});
				});
			} else if (option.value) args = option;
		}
		interaction.member = interaction.guild.members.cache.get(interaction.user.id);

		cmd.run(client, interaction, args);
	}

	// Context Menu Handling
	if (interaction.commandType === ApplicationCommandType.Message) {
		await interaction.deferReply({ ephemeral: false });
		const command = client.slashCommands.get(interaction.commandName);
		if (command) command.run(client, interaction);
	}
});
