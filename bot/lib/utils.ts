import chalk from 'chalk';
import bot from '../bot';

/**
 * Logger function to log messages to the console
 */

interface Logger {
	message: string;
	module?: string;
	level: 'DEBUG' | 'ERROR' | 'INFO' | 'SUCCESS' | 'WARNING' | 'HANDLER';
}

const colors = {
	DEBUG: 'yellow',
	ERROR: 'red',
	INFO: 'blue',
	SUCCESS: 'green',
	WARNING: 'yellow',
	HANDLER: 'magenta',
} as const;

export function Logger({ message, module, level }: Logger) {
	if (level === 'DEBUG' && !bot.config.bot_token) return;
	return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk[colors[level]](level)} ]${module ? `[ ${chalk[colors[level]](module.toUpperCase())} ]` : ''} ${message}`);
}

/**
 * Replacer function to replace all instances of a string in a string
 */

// Alter the string prototype to allow for easier placeholder replacement
String.prototype.replacer = function (replaceData) {
	const keysWithBraces = Object.keys(replaceData).map((key) => `{${key}}`);
	const regex = new RegExp(keysWithBraces.join('|'), 'g');
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return this.replace(regex, (match: any) => {
		const keyWithoutBraces = match.slice(1, -1); // Remove the curly braces
		return (replaceData[keyWithoutBraces] !== undefined ? replaceData[keyWithoutBraces] : match) as string;
	});
};

interface ReplaceData {
	[key: string | number | symbol]: unknown;
}

// Add string prototype to replace welcomer variables
declare global {
	interface String {
		replacer(replaceData: ReplaceData): string;
	}
}
