class SchedulerInteraction {

	constructor() {
		this.message = null;
		this.interaction = null;
	}

	setChannelId(channelId) {
		this.channelId = channelId;
	}

	setGuildId(guildId) {
		this.guildId = guildId;
	}

}

module.exports = SchedulerInteraction;