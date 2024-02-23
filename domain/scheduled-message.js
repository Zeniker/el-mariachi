class ScheduledMessage {

	constructor() {
		this.message = null;
		this.client = null;
		this.channelId = null;
		this.guildId = null;
		this.userId = null;
	}

	setMessage(message) {
		this.message = message;
	}

	setClient(client) {
		this.client = client;
	}

	setChannelId(channelId) {
		this.channelId = channelId;
	}

	setGuildId(guildId) {
		this.guildId = guildId;
	}

	setUserId(userId){
		this.userId = userId;
	}

}

module.exports = ScheduledMessage;