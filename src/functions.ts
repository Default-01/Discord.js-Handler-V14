// import { LogType } from './types/types';
// import client from './index.js';
// import chalk from 'chalk';

// export function log(type: LogType, message: string, module?: string) {
// 	if (type === 'debug' && client.config.debugMode) return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.yellow('DEBUG')} ] ${module ? ` [${chalk.yellow(module)}]` : ''} ${message}`);
// 	if (type === 'info') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.blue('INFO')} ] ${message}`);
// 	if (type === 'error') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.red('ERROR')} ] ${message}`);
// 	if (type === 'success') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.green('SUCCESS')} ] ${message}`);
// 	if (type === 'warn') return console.log(`[ ${new Date().toLocaleString()} ][ ${chalk.yellow('WARNING')} ] ${message}`);
// 	return console.log(`[ ${new Date().toLocaleString()} ] ${message}`);
// }
