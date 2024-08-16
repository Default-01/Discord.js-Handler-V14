@echo off

rem Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
  echo Node.js is not installed. Please install it from https://nodejs.org/en/download and try again.
  exit /b 1
)

rem Navigate to the directory of the script
cd /d "%~dp0"

rem Remove package.json if it exists
if exist package.json (
  echo Removing existing package.json...
  del package.json
)

rem Create package.json if it doesn't exist
if not exist package.json (
  echo Creating package.json...
  echo { >> package.json
  echo   "name": "discord-bot", >> package.json
  echo   "version": "1.0.0", >> package.json
  echo   "description": "", >> package.json
  echo   "main": "./src/bot.js", >> package.json
  echo   "dependencies": { >> package.json
  echo     "@defaultsbotdevelopment/dbd-tools": "^2.3.3", >> package.json
  echo     "better-sqlite3": "^11.1.2", >> package.json
  echo     "chalk": "^4.1.2", >> package.json
  echo     "discord.js": "^14.15.3", >> package.json
  echo     "knex": "^3.1.0", >> package.json
  echo     "zod": "^3.23.8" >> package.json
  echo   } >> package.json
  echo } >> package.json
)

rem Start a new command window to run npm install and the index.js and keep it alive
start cmd /k "npm install && cls && node ./src/bot.js"