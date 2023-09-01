import pkgJson from './package.json' assert { type: 'json' };
import { exec } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs';
import chalk from 'chalk';

// get paths
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const releasePath = join(dirName, 'release', 'nodejs');

// generate the release package.json file
writeFile(
	join(releasePath, 'package.json'),
	JSON.stringify(
		{
			name: pkgJson.name,
			version: pkgJson.version,
			description: pkgJson.description,
			main: pkgJson.main,
			author: pkgJson.author,
			license: pkgJson.license,
			scripts: {
				start: 'node index.js',
			},
			dependencies: pkgJson.dependencies,
		},
		null,
		2
	),
	(err) => {
		if (err) {
			console.log(chalk.red('Error writing package.json file:'));
			console.log(err);
		} else {
			console.log(chalk.green('Successfully written package.json file.'));
		}
	}
);

// zip the release folder
exec(`powershell Compress-Archive -Path "${join(dirName, 'release')}" -DestinationPath "${join(dirName, 'release', `${pkgJson.name}-${pkgJson.version}.zip`)}"`, (err, stdout, stderr) => {
	if (err) {
		if (err.code === 1) return console.log(chalk.red('Version release folder already zipped. please generate a new version.'));
		console.log(chalk.red('Error zipping release folder:'));
		console.log(err);
	} else {
		console.log(chalk.green('Successfully zipped release folder.'));
	}
});
