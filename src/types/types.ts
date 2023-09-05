// Types for log function
export type LogType = 'debug' | 'info' | 'error' | 'success' | 'warn' | 'handler';

// Add string prototype to replace welcomer variables
declare global {
	interface String {
		replacer(replaceData: ReplaceData): string;
	}
}

export interface ReplaceData {
	[key: string | number | symbol]: unknown;
}
