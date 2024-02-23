const { Collection } = require('discord.js');
const Hola = require('../commands/utility/hola.js');
const SendMessage = require('../commands/utility/send-message.js');
const SendDM = require('../commands/utility/send-dm.js');
const ScheduleMessage = require('../commands/utility/schedule-message.js');

class CommandConfiguration {

	static configure(client) {
		client.commands = new Collection();

		CommandConfiguration.__configureUtilites(client);
	}

	static __configureUtilites(client) {

		client.commands.set(Hola.data.name, Hola);
		client.commands.set(SendMessage.data.name, SendMessage);
		client.commands.set(SendDM.data.name, SendDM);
		client.commands.set(ScheduleMessage.data.name, ScheduleMessage);

	}

}

module.exports = CommandConfiguration;