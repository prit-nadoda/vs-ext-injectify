import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { createFilesForEntity } from './commands/createFiles';  // Import the function

export function activate(context: vscode.ExtensionContext) {
    console.log('Injectify extension activated.');

    // Monitor folder creation logic (assuming you have that in place)
    const apiFolderPath = path.join(vscode.workspace.rootPath || '', 'src', 'api');
    
    vscode.workspace.onDidCreateFiles((event) => {
        event.files.forEach((file) => {
            const folderPath = file.fsPath;

            // Check if the created file is a folder under ./src/api
            if (folderPath.startsWith(apiFolderPath) && fs.statSync(folderPath).isDirectory()) {
                const entityName = path.basename(folderPath);  // Get the folder name (e.g., 'user')

                // Prompt the user for file creation
                vscode.window.showInformationMessage(
                    `Do you want to allow Injectify to inject files in /${entityName}?`,
                    { modal: true },
                    'Yes', 'No'
                ).then(async (selection) => {
                    if (selection === 'Yes') {
                        // Pass both folderPath and entityName to the function
                        await createFilesForEntity(folderPath, entityName);
                    }
                });
            }
        });
    });

    // Register the command to manually create files (optional)
    let disposable = vscode.commands.registerCommand('injectify.createFiles', async (folderPath: string) => {
        const entityName = path.basename(folderPath);  // Extract the entity name from the path
        await createFilesForEntity(folderPath, entityName);  // Pass both arguments
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
