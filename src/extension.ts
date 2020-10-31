// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as which from '@types/which';

const SUBL = 'subl';

const stateKeyLast = 'switch-editor.last';

function chooseEditorAndSave(context: vscode.ExtensionContext, _editor: vscode.TextEditor, _edit: vscode.TextEditorEdit, onSuccess: ((editorType: string) => void)) {
	return vscode.window.showQuickPick(['subl']).then((result) => {
		let editorType = result as string;
		if (editorType !== undefined) {
			context.globalState.update(stateKeyLast, editorType).then(() => {
				onSuccess(editorType);
			});
		}
	});
};

function switchToEditor(editor: vscode.TextEditor, _edit: vscode.TextEditorEdit, editorType: string) {
	switch (editorType) {
		case SUBL: {
			let subl = which.sync('subl');
			let line = editor.selection.active.line + 1;
			let column = editor.selection.active.character + 1;
			cp.execFile(subl, [`${editor.document.fileName}:${line}:${column}`]);
		} break;

		default: {
			vscode.window.showErrorMessage(`Unknown editor to switch to: ${editorType}`);
		} break;
	}
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('switch-editor.switch', (editor, edit) => {
		let lastEditor = context.globalState.get<string | null>(stateKeyLast, null);
		if (lastEditor) {
			switchToEditor(editor, edit, lastEditor);
		} else {
			chooseEditorAndSave(context, editor, edit, (editorType) => {
				switchToEditor(editor, edit, editorType);
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerTextEditorCommand('switch-editor.choose', (editor, edit) => {
		chooseEditorAndSave(context, editor, edit, (editorType) => {
			switchToEditor(editor, edit, editorType);
		});
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
