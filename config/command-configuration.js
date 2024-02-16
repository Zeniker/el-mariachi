const { Collection } = require('discord.js');
const Hola = require('../commands/utility/hola.js');


class CommandConfiguration {

	static configure(client) {
		client.commands = new Collection();

		CommandConfiguration.__configureUtilites(client);
	}

	static __configureUtilites(client) {

		client.commands.set(Hola.data.name, Hola);

	}

}

module.exports = CommandConfiguration;