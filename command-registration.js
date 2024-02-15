// Configs environment
const DotEnv = require('dotenv');
DotEnv.config();

const { REST, Routes } = require('discord.js');
const Hola = require('./commands/utility/hola.js');

const commands = [];
commands.push(Hola.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
			{ body: commands },
		);

		commands.forEach(element => {
			console.log(`Registering ${element}`);
		});
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();