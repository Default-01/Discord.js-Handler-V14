import { LogType } from './types/types';
import client from './index';
import chalk from 'chalk';

export function log(type: LogType, message: string, module?: string) {
	if (type === 'debug' && client.config.debugMode) return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.yellow('DEBUG')} ]${module ? `[ ${chalk.yellow(module)} ]` : ''} ${message}`);
	if (type === 'info') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.blue('INFO')} ]${module ? `[ ${chalk.blue(module)} ]` : ''} ${message}`);
	if (type === 'error') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.red('ERROR')} ]${module ? `[ ${chalk.red(module)} ]` : ''} ${message}`);
	if (type === 'success') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.green('SUCCESS')} ]${module ? `[ ${chalk.green(module)} ]` : ''} ${message}`);
	if (type === 'warn') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.yellow('WARNING')} ]${module ? `[ ${chalk.yellow(module)} ]` : ''} ${message}`);
	if (type === 'handler') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.magenta('HANDLER')} ]${module ? `[ ${chalk.magenta(module)} ]` : ''} ${message}`);
	return console.log(`[ ${new Date().toLocaleString()} ] ${message}`);
}
