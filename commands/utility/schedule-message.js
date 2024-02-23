const { SlashCommandBuilder, FetchGuildOptions } = require('discord.js');
const ScheduledMessage = require('../../domain/scheduled-message');
const NodeSchedule = require('node-schedule');

const createSlashCommand = () => {

	return new SlashCommandBuilder()
		.setName('schedule-message')
		.setDescription('El Mariachi will schedule and send specified message');

};

const execute = async (interaction) => {

	// const a = new ScheduledMessage();
	// a.setGuildId(interaction.guildId);
	// a.setChannelId(interaction.channelId);
	// a.setClient(interaction.client);
	// a.setUserId(interaction.user.id);

	// a.client.guilds.fetch({ id: a.guildId }).then((guilds) => {
	// 	guilds.first().fetch().then(guild => {
	// 		guild.channels.fetch(a.channelId).then(channel => channel.send('Porra vai logo'));
	// 	});
		
	// });

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

				const time = parseTime(messageContent);

				dataEnvio.setHours(time[0]);
				dataEnvio.setMinutes(time[1]);
				dataEnvio.setSeconds(time[2]);

				const scheduledMessage = new ScheduledMessage();
				scheduledMessage.setGuildId(interaction.guildId);
				scheduledMessage.setChannelId(interaction.channelId);
				scheduledMessage.setMessage(message.content);
				scheduledMessage.setClient(interaction.client);
				scheduledMessage.setUserId(interaction.user.id);

				NodeSchedule.scheduleJob(dataEnvio, sendScheduledMessage.bind(null, a));

			})
			.catch((error) => {
				console.log(error);
				interaction.followUp('¡Ay caramba! Não sei quando enviar');
			});
	});

};

const parseTime = (timeInString) => {

	const hourRegex = /^(\d{2})$/;
	const hourAndMinutesRegex = /^(\d{2})(?::)(\d{2})$/;
	const hourAndMinutesAndSecondsRegex = /^(\d{2})(?::)(\d{2})(?::)(\d{2})$/;

	let time = timeInString.match(hourRegex);

	if (time !== null) {
		return parseTimeArray(time);
	}

	time = timeInString.match(hourAndMinutesRegex);

	if (time !== null) {
		return parseTimeArray(time);
	}

	time = timeInString.match(hourAndMinutesAndSecondsRegex);

	if (time !== null) {
		return parseTimeArray(time);
	}

};

const parseTimeArray = (timeInArray) => {

	const intTimeIntArray = [];
	intTimeIntArray.push(parseInt(timeInArray[1]));
	intTimeIntArray.push(parseInt(timeInArray[2] || 0));
	intTimeIntArray.push(parseInt(timeInArray[3] || 0));

	return intTimeIntArray;
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