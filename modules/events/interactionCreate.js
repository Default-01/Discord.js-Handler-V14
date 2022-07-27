const client = require("../../index");
const { ApplicationCommandOptionType, ApplicationCommandType } = require('discord.js')

client.on("interactionCreate", async (interaction) => {
	// Slash Command Handling
	if (interaction.commandType === ApplicationCommandType.ChatInput) {
		await interaction.deferReply({ ephemeral: false }).catch(() => { });

		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd)
			return interaction.followUp({ content: "An error has occured " });

		const args = [];

		for (let option of interaction.options.data) {
			if (option.type === ApplicationCommandOptionType.Subcommand) {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			} else if (option.value) args.push(option.value);
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
