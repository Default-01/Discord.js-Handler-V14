import knex from 'knex';
import { Logger } from './utils';

const InitDatabase = async () => {
	try {
		const db = knex({
			client: 'better-sqlite3',
			useNullAsDefault: true,
			connection: {
				filename: './db.db',
			},
		});

		Logger({ level: 'SUCCESS', module: 'DATABASE', message: 'Database initialized' });

		return db;
	} catch (error) {
		if (error instanceof Error) {
			Logger({ level: 'ERROR', module: 'DATABASE', message: error.message });
		}
	}
};

export default InitDatabase;
