import * as core from '@actions/core';
import { exec, ExecOptions } from '@actions/exec';
import { writeFileSync } from 'fs';
import { unformattedJava } from './dev';

const execute = async (
	command: string,
	{ silent = false } = {}
): Promise<{ err: boolean; stdOut: string; stdErr: string }> => {
	let stdOut = '';
	let stdErr = '';
	const options: ExecOptions = {
		silent,
		ignoreReturnCode: true,
		listeners: {
			stdout: (data) => (stdOut += data.toString()),
			stderr: (data) => (stdErr += data.toString()),
		},
	};

	const exitCode = await exec(command, undefined, options);

	return { err: exitCode !== 0, stdErr, stdOut };
};

const push = async () => execute('git push');

const main = async () => {
	const DEBUG = core.isDebug();
	const args = core.getInput('prettier-args') || '-w';
	const files = core.getInput('files') || '**/*.java';

	const commitString = core.getInput('commit') || 'true';
	const commit = commitString.toLowerCase() !== 'false';

	const commitMessage = core.getInput('commit-message') || 'Format Java';

	await core.group('Installing Prettier', async () => {
		const commands: ReturnType<typeof execute>[] = [];
		commands.push(execute('npm i -g prettier@2.6.2', { silent: true }));
		commands.push(execute('npm i -g prettier-plugin-java@1.6.1', { silent: true }));
		await Promise.all(commands).then((results) => {
			if (results.some((result) => result.err))
				core.setFailed('Failed to install prettier.');
		});
	});

	if (DEBUG) writeFileSync('./Java.java', unformattedJava);

	const command = `prettier ${args} "${files}"`;
	core.debug(command);

	await core.group('Running Prettier', async () => {
		const { err, stdErr } = await execute(command);

		if (err) {
			console.error(`Error executing prettier with args: ${args}`);
			return core.setFailed(stdErr);
		}

		if (commit) {
			await core.group('Committing changes', async () => {
				await execute('git config user.name github-actions', { silent: true });
				await execute("git config user.email ''", { silent: true });
				const { err } = await execute('git diff-index --quiet HEAD', {
					silent: true,
				});
				if (err) {
					await execute(`git commit --all -m "${commitMessage}"`);
					await push();
				} else core.info('Nothing to commit!');
			});
		}
	});
};

try {
	main();
} catch (err: unknown) {
	if (err instanceof Error) core.setFailed(err.message);
	else core.setFailed('An error occurred.');
}
