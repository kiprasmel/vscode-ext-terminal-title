# Terminal Title Context

A super simple VSCode extension that exposes the currently focused terminal title as a context variable for use in keybindings.

## Usage

Once installed, the extension automatically tracks the active terminal and sets a context variable called `terminalTitle` with the terminal's name.

## Example Keybindings

Add keybindings to your `keybindings.json` that trigger only when a specific terminal is focused:

```json
[
  {
    "key": "ctrl+shift+t",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "npm test\u000D" },
    "when": "terminalTitle == 'bash' && terminalFocus"
  },
  {
    "key": "ctrl+shift+b",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "npm run build\u000D" },
    "when": "terminalTitle == 'node' && terminalFocus"
  }
]
```

## Development

To test this extension locally:

1. Open this folder in VSCode
2. Press F5 to launch the Extension Development Host
3. Open a terminal in the new window
4. The `terminalTitle` context will be available for your keybindings

## Context Variable

- `terminalTitle` - String containing the name of the currently focused terminal (empty string if no terminal is focused)
