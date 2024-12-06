import * as vscode from 'vscode';
import * as path from 'path';
import { createFilesForEntity } from '../commands/createFiles';

export function monitorFolderCreation(context: vscode.ExtensionContext) {
    // Ensure workspace is loaded before accessing folders
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
        return vscode.window.showErrorMessage('No workspace folder is open.');
    }

    const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const apiFolderPath = path.join(workspaceRoot, 'src', 'api');

    // Create a file system watcher to monitor the 'src/api' folder
    const watcher = vscode.workspace.createFileSystemWatcher('**/src/api/*');
    
    // Listen for when a folder is created
    watcher.onDidCreate((uri) => {
        console.log(`New folder created: ${uri.fsPath}`);
        promptForFileInjection(uri.fsPath);
    });

    // Register cleanup of watcher when extension is deactivated
    context.subscriptions.push(watcher);
}

async function promptForFileInjection(folderPath: string) {
    const folderName = path.basename(folderPath);

    // Display a modal prompt to the user
    const userResponse = await vscode.window.showInformationMessage(
        `Do you want to allow Injectify to inject files in /${folderName}?`, 
        { modal: true },
        'Yes', 
        'No'
    );

    // If the user clicks "Yes", generate the files
    if (userResponse === 'Yes') {
        await createFilesForEntity(folderPath, folderName);
    }
}
