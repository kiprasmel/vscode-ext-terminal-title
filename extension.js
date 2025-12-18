const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    log("extension is now active");

	let previousTerminalTitle = "";

	/**
	 * note: using "terminal" from callback does not work correctly, as its title is outdated.
	 * so here, we're using the vscode.window.activeTerminal, which works correctly.
	 */
    function updateTerminalTitleContext() {
        const terminalTitle = vscode.window.activeTerminal?.name;
		const willSkip = !terminalTitle || terminalTitle === previousTerminalTitle

		if (willSkip) {
			return;
		}

		vscode.commands.executeCommand("setContext", "terminalTitle", terminalTitle);
		previousTerminalTitle = terminalTitle;
		log("update detected. title:", terminalTitle)
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
    updateTerminalTitleContext();
}

function deactivate() {}

const EXT_NAME = "kiprasmel.terminal-title-context";

function log(...msgs) {
	if (!!process.env.DEBUG_TERMINAL_TITLE) {
		console.warn(EXT_NAME + ":", ...msgs)
	}
}

module.exports = {
    activate,
    deactivate
};
