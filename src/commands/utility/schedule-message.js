const { SlashCommandBuilder } = require('discord.js');
const ScheduledMessage = require('../../domain/scheduled-message');
const NodeSchedule = require('node-schedule');
const DateTimeParser = require('../../utils/date-time-parser');

const createSlashCommand = () => {

	return new SlashCommandBuilder()
		.setName('schedule-message')
		.setDescription('El Mariachi will schedule and send specified message');

};

const execute = async (interaction) => {

	// Reply asking which message the bot will send
	interaction.reply('Que mensagem deseja enviar?').then(() => {
		const collectorFilter = m => interaction.user.id === m.author.id;

		// Wait for a message using filter. Will wait 60 seconds
		interaction.channel.awaitMessages({ filter: collectorFilter, time: 60_000, max: 1, errors: ['time'] })
			.then(messages => {
				askForScheduling(interaction, messages.first());
			})
			.catch(() => {
				interaction.followUp('¡Ay caramba! Não sei que mensagem enviar');
			});

	});

};

// Reply asking when to send message
const askForScheduling = async (interaction, message) => {

	message.reply('Quando quer enviar?').then(() => {
		const collectorFilter = m => interaction.user.id === m.author.id;

		// Wait for a message using filter. Will wait 60 seconds
		interaction.channel.awaitMessages({ filter: collectorFilter, time: 60_000, max: 1, errors: ['time'] })
			.then(messages => {

				let messageContent = messages.first().content;
				messageContent = messageContent.trim();

				const dataEnvio = new Date();
				const dateTimeParser = new DateTimeParser();

				const parsedDateTime = dateTimeParser.parse(messageContent);

				if (parsedDateTime === null) {
					console.error(`Message ${messageContent} is not a valid format`);
					return;
				}

				dataEnvio.setHours(parsedDateTime.hours);
				dataEnvio.setMinutes(parsedDateTime.minutes);
				dataEnvio.setSeconds(parsedDateTime.seconds);

				const scheduledMessage = new ScheduledMessage();
				scheduledMessage.setGuildId(interaction.guildId);
				scheduledMessage.setChannelId(interaction.channelId);
				scheduledMessage.setMessage(message.content);
				scheduledMessage.setClient(interaction.client);
				scheduledMessage.setUserId(interaction.user.id);

				NodeSchedule.scheduleJob(dataEnvio, sendScheduledMessage.bind(null, scheduledMessage));

			})
			.catch((error) => {
				console.log(error);
				interaction.followUp('¡Ay caramba! Não sei quando enviar');
			});
	});

};

const sendScheduledMessage = scheduledMessage => {

	console.log('Sending message...');
	console.log(scheduledMessage);

	scheduledMessage.client.guilds.fetch({ id: scheduledMessage.guildId }).then((guilds) => {
		guilds.first().fetch().then(guild => {
			guild.channels.fetch(scheduledMessage.channelId).then(channel => {
				channel.send(`<@${scheduledMessage.userId}>, aqui está sua mensagem: ${scheduledMessage.message}`);
			});
		});

	});

};

module.exports = {
	data: createSlashCommand(),
	execute: execute,
};