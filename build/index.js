"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("./config.json"));
// Initialize the client
const client = new discord_js_1.Client({
    intents: [discord_js_1.IntentsBitField.Flags.MessageContent, discord_js_1.IntentsBitField.Flags.GuildMessages, discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMembers],
});
// Global variables
client.config = config_json_1.default;
client.commands = new discord_js_1.Collection();
client.events = new discord_js_1.Collection();
client.contexts = new discord_js_1.Collection();
client.components = new discord_js_1.Collection();
client.modals = new discord_js_1.Collection();
// Catch exceptions and rejections
const ignore = [
// 'Missing Permissions',
// 'Unknown Message',
// 'Missing Access',
// "Cannot read property 'emoji' of undefined",
// 'Cannot send messages to this user',
// 'AbortError',
// 'Unknown Channel',
// 'socket hang up',
// 'failed, reason: read ECONNRESET',
// 'Response: Internal Server Error',
// 'InteractionAlreadyReplied',
// 'Invalid Webhook Token',
];
process
    .on('unhandledRejection', (reason) => __awaiter(void 0, void 0, void 0, function* () {
    // log error if not in ignore list
    if (!ignore.includes(reason.toString()))
        console.error(reason, 'Unhandled Rejection');
}))
    .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception');
});
// login with the client
client.login(client.config.token);
