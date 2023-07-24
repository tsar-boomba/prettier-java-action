# Prettier Java Format Action

## Description

The `prettier-java-format-action` is a GitHub Action that automatically formats Java code using Prettier.

## Inputs

### `prettier-args`

Arguments for Prettier CLI. (Optional)

- Description: Specify additional arguments to be passed to the Prettier CLI.
- Required: No
- Default: `-w`

### `files`

Pattern to match the files to be formatted. (Optional)

- Description: Specify a file pattern to match the Java files that you want to format.
- Required: No
- Default: `**/*.java`

### `commit`

Whether or not you want the action to push to your repository with the formatting. (Optional)

- Description: Set this to `true` if you want the action to commit the formatted changes to your repository.
- Required: No
- Default: `true`

### `github-username`

Username for the GitHub Action to commit with. (Optional)

- Description: Specify the GitHub username that will be used for committing the changes.
- Required: No
- Default: `github-actions`

### `commit-message`

Message for formatter commit. (Optional)

- Description: Provide a custom commit message that will be used when committing the formatted changes.
- Required: No
- Default: `Format Java`

## Usage

```yaml
name: Format Java Code

on:
  push:
    branches:
      - main

jobs:
  format-code:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v3

    - name: Prettier Java Format
      uses: tsar-boomba/prettier-java-format-action@main
      with:
        prettier-args: '--tab-width 4  --write'  # See: https://prettier.io/docs/en/options.html
        files: '**/*.java'
        commit: 'true'
        github-username: 'github-actions'
        commit-message: 'Format Java Code'
```

## License

This project is licensed under the [MIT License](LICENSE).
