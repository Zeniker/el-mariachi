const { SlashCommandBuilder } = require('discord.js');

const createSlashCommand = () => {

	return new SlashCommandBuilder()
		.setName('hola')
		.setDescription('El Mariachi sends greetings');

};

const execute = async (interaction) => {
	await interaction.reply(`¡Hola, amigo ${interaction.user.username}!`);
};

module.exports = {
	data: createSlashCommand(),
	execute: execute,
};