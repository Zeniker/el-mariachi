const { SlashCommandBuilder } = require('discord.js');

const createSlashCommand = () => {

	return new SlashCommandBuilder()
		.setName('send-message')
		.setDescription('El Mariachi will send specified message');

};

const execute = async (interaction) => {

	// Reply asking which message the bot will send
	interaction.reply('Que mensagem deseja enviar?').then(() => {
		const collectorFilter = m => interaction.user.id === m.author.id;

		// Wait for a message using filter. Will wait 60 seconds
		interaction.channel.awaitMessages({ filter: collectorFilter, time: 60_000, max: 1, errors: ['time'] })
			.then(messages => {
				interaction.followUp(`<@${interaction.user.id}>, sua mensagem é: ${messages.first().content}`);
			})
			.catch(() => {
				interaction.followUp('¡Ay caramba! Não sei que mensagem enviar');
			});

	});

};

module.exports = {
	data: createSlashCommand(),
	execute: execute,
};