const ParsedDateTime = require('../domain/parsed-date-time');

class DateTimeParser {

	constructor() {

		this.regexParserList = [];
		this.regexParserList.push(/^(\d{2})$/); // Hour regex
		this.regexParserList.push(/^(\d{2})(?::)(\d{2})$/); // Hour and minutes regex
		this.regexParserList.push(/^(\d{2})(?::)(\d{2})(?::)(\d{2})$/); // Hour, minutes and seconds regex

	}

	parse(dateTimeAsString) {

		for (let index = 0; index < this.regexParserList.length; index++) {

			const regexParser = this.regexParserList[index];
			const dateTimeAsArray = dateTimeAsString.match(regexParser);
			console.log(dateTimeAsArray);

			if (dateTimeAsArray !== null) {

				const parsedDateTime = new ParsedDateTime();
				parsedDateTime.setHours(parseInt(dateTimeAsArray[1]));
				parsedDateTime.setMinutes(parseInt(dateTimeAsArray[2] || 0));
				parsedDateTime.setSeconds(parseInt(dateTimeAsArray[3] || 0));

				return parsedDateTime;

			}

		}

		return null;

	}


}

module.exports = DateTimeParser;