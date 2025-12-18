# Terminal Title Context

A simple VSCode extension that exposes the currently focused terminal title as a context variable for use in keybindings "when" clause.

## Installation

```sh
git clone https://github.com/kiprasmel/vscode-ext-terminal-title
cd vscode-ext-terminal-title

yarn

# choose target:
TARGET=cursor yarn reinstall
TARGET=code   yarn reinstall
```

## Usage

Once installed, the extension automatically tracks the active terminal and sets a context variable called `terminalTitle` with the terminal's name.

Note: to work correctly, you need to launch the editor with a flag:

```sh
cursor --enable-proposed-api kiprasmel.terminal-title-context
code   --enable-proposed-api kiprasmel.terminal-title-context
```

or just create an alias function (e.g. in `~/.zshrc`) to make simpler:

```sh
c() {
	cursor --enable-proposed-api kiprasmel.terminal-title-context "$@"
}
```

## Example Keybindings

- add keybindings to your `keybindings.json` that trigger only when a specific terminal is focused:

```json
[
	/**
	 * claude code: Enter = newline, Cmd+Enter = submit.
	 * does NOT affect regular terminal submit, so works perfect.
	 *
	 * "terminalTitle" requires custom extension:
	 * - https://github.com/kiprasmel/vscode-ext-terminal-title
	 *
	 */
	{
		"key": "enter",
		"command": "workbench.action.terminal.sendSequence",
		"args": {
			"text": "\r"
		},
		"when": "terminalFocus && terminalTitle != 'claude'"
	},
	{
		"key": "enter",
		"command": "workbench.action.terminal.sendSequence",
		"args": {
			"text": "\u001b\r"
		},
		"when": "terminalFocus && terminalTitle == 'claude'"
	},
	{
		"key": "cmd+enter",
		"command": "workbench.action.terminal.sendSequence",
		"args": {
			"text": "\r"
		},
		"when": "terminalFocus"
	}
]
```

## Development

To test this extension locally:

1. Open this folder in VSCode
2. Press F5 to launch the Extension Development Host
3. Open a terminal in the new window
4. The `terminalTitle` context will be available for your keybindings
