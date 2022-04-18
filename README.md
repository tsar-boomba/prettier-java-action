# Prettier Java Action

This action prints formats java code with prettier.

## Inputs

## `prettier-args`

Arguments for prettier command. Default `"--write"`.

# Files

## `files`

Pattern to match the files to be formatted. Default `"**/*.java"`

## Commit Message

## `commit-message`

Message for formatter commit. Default `"Format Java"`.

## Commit

## `commit`

Whether or not you want the action to push to your repo with the formatting. Default `true`.
**Note: You must be using actions/checkout@v2**

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
who-to-greet: 'Mona the Octocat'
