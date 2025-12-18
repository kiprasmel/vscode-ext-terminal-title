const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log("Terminal Title Context extension is now active");

	let previousTerminalTitle = "";

    function updateTerminalTitleContext(terminal) {
        const terminalTitle = terminal ? terminal.name : "";
		console.log("update detected. title:", terminalTitle)

		if (terminalTitle === previousTerminalTitle) {
			console.log("title unchanged, skipping update");
			return;
		}

		previousTerminalTitle = terminalTitle;

		vscode.commands.executeCommand("setContext", "terminalTitle", terminalTitle);
    }

	const subs = [
		() => vscode.window.onDidChangeActiveTerminal(updateTerminalTitleContext),
		() => vscode.window.onDidChangeTerminalState(updateTerminalTitleContext),
		() => vscode.window.onDidWriteTerminalData(updateTerminalTitleContext),
		() => vscode.window.onDidOpenTerminal(updateTerminalTitleContext),
		() => vscode.window.onDidCloseTerminal(updateTerminalTitleContext),
	]

	for (const sub of subs) {
		context.subscriptions.push(sub());
	}

    /* set initial context */
    updateTerminalTitleContext(vscode.window.activeTerminal);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
