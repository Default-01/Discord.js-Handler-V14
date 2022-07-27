const client = require("../../index");
const term = require('terminal-kit').terminal;

client.on("ready", () => {

  term(`[^G INFO^ ] ${client.user.tag} is now online!\n`)
});
