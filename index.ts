import * as core from '@actions/core';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { unformattedJava } from './dev';

const main = async () => {
	const DEBUG = core.isDebug();
	const args = core.getInput('prettier-args') || '-w';

	if (DEBUG) writeFileSync('./Java.java', unformattedJava);

	const command = 'npx prettier ' + args + ' "**/*.java"';
	core.debug(command);

	exec(command, (err, stdOut, stdErr) => {
		if (err) {
			console.log(`Error executing prettier with args: ${args}`);
			core.error(err);
			return core.setFailed('There was an error executing prettier.');
		}

		core.debug(stdOut);

		core.debug(stdErr);

		if (stdErr) {
			core.error(`Prettier threw an error: \n ${stdErr}`);
			return core.setFailed('Prettier failed with error.');
		}
	});
};

try {
	main();
} catch (err: unknown) {
	if (err instanceof Error) core.setFailed(err.message);
	else core.setFailed('An error occurred.');
}
