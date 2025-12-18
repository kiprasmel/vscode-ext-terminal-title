const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Terminal Title Context extension is now active');

    // Function to update the terminal title context
    function updateTerminalTitleContext(terminal) {
        const terminalTitle = terminal ? terminal.name : '';
        vscode.commands.executeCommand('setContext', 'terminalTitle', terminalTitle);
    }

    // Update context when active terminal changes
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTerminal((terminal) => {
            updateTerminalTitleContext(terminal);
        })
    );

    // Update context when terminal state changes (e.g., when running commands changes the title)
    context.subscriptions.push(
        vscode.window.onDidChangeTerminalState((terminal) => {
            // Only update if this is the active terminal
            if (terminal === vscode.window.activeTerminal) {
                updateTerminalTitleContext(terminal);
            }
        })
    );

    // Update context when terminal is opened
    context.subscriptions.push(
        vscode.window.onDidOpenTerminal(() => {
            updateTerminalTitleContext(vscode.window.activeTerminal);
        })
    );

    // Update context when terminal is closed
    context.subscriptions.push(
        vscode.window.onDidCloseTerminal(() => {
            updateTerminalTitleContext(vscode.window.activeTerminal);
        })
    );

    // Set initial context
    updateTerminalTitleContext(vscode.window.activeTerminal);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
