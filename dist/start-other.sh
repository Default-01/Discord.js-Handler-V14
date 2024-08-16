#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install it from https://nodejs.org/en/download and try again."
  exit 1
fi

# Navigate to the directory of the script
cd "$(dirname "$0")"

# Remove package.json if it exists
if [ -f package.json ]; then
  echo "Removing existing package.json..."
  rm package.json
fi

# Check if package.json exists
if [ ! -f package.json ]; then
  echo "Creating package.json..."
  cat <<EOF > package.json
{
  "name": "discord-bot",
  "version": "1.0.0",
  "description": "",
  "main": "./src/bot.js",
  "dependencies": {
    "@defaultsbotdevelopment/dbd-tools": "^2.3.3",
		"better-sqlite3": "^11.1.2",
		"chalk": "^4.1.2",
		"discord.js": "^14.15.3",
		"knex": "^3.1.0",
		"zod": "^3.23.8"
  }
}
EOF
fi

# Run npm install and start the application
npm install && node ./src/bot.js