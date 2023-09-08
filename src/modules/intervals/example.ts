import { BotInterval } from '../../types/client.types';

export const interval: BotInterval = {
	enabled: false,
	name: 'example',
	interval: 1000,

	run: async (client) => {
		console.log('Example Interval');
	},
};
