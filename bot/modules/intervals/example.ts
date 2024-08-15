import type { BotInterval } from '../../types/bot.types';

export default {
	enabled: true,
	name: 'example',
	interval: 10000,

	run: async (client) => {
		console.log('Example Interval');
	},
} satisfies BotInterval;
