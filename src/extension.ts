import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { createFilesForEntity } from './commands/createFiles';

export function activate(context: vscode.ExtensionContext) {
    console.log('Injectify extension activated.');

    const apiFolderPath = path.join(vscode.workspace.rootPath || '', 'src', 'api');

    vscode.workspace.onDidCreateFiles((event) => {
        event.files.forEach((file) => {
            const folderPath = file.fsPath;

            // Ensure the created path is a directory
            if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
                // Check if the parent folder of the created folder is exactly ./src/api
                const parentFolder = path.dirname(folderPath);
                if (parentFolder === apiFolderPath) {
                    const entityName = path.basename(folderPath); // Get folder name (e.g., 'user')

                    // Prompt the user for file creation
                    vscode.window.showInformationMessage(
                        `Do you want to allow Injectify to inject files in /${entityName}?`,
                        { modal: true },
                        'Yes', 'No'
                    ).then(async (selection) => {
                        if (selection === 'Yes') {
                            await createFilesForEntity(folderPath, entityName);
                        }
                    });
                }
            }
        });
    });

    // Register the command to manually create files (optional)
    let disposable = vscode.commands.registerCommand('injectify.createFiles', async (folderPath: string) => {
        const entityName = path.basename(folderPath); // Extract the entity name from the path
        await createFilesForEntity(folderPath, entityName); // Pass both arguments
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
