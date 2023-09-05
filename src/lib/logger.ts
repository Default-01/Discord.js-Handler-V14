import client from '@/index';
import chalk from 'chalk';

export default class Logger {
	public static debug(message: string, module?: string) {
		if (client.config.debugMode) return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.yellow('DEBUG')} ]${module ? `[ ${chalk.yellow(module)} ]` : ''} ${message}`);
	}

	public static error(message: string, module?: string) {
		return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.red('ERROR')} ]${module ? `[ ${chalk.red(module)} ]` : ''} ${message}`);
	}

	public static info(message: string, module?: string) {
		return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.blue('INFO')} ]${module ? `[ ${chalk.blue(module)} ]` : ''} ${message}`);
	}

	public static success(message: string, module?: string) {
		return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.green('SUCCESS')} ]${module ? `[ ${chalk.green(module)} ]` : ''} ${message}`);
	}

	public static warn(message: string, module?: string) {
		return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.yellow('WARNING')} ]${module ? `[ ${chalk.yellow(module)} ]` : ''} ${message}`);
	}

	public static handler(message: string, module?: string) {
		return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.magenta('HANDLER')} ]${module ? `[ ${chalk.magenta(module)} ]` : ''} ${message}`);
	}
}
