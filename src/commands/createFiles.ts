import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { fileTemplates } from '../templates/fileTemplates';  // Make sure the template path is correct

export async function createFilesForEntity(folderPath: string, entityName: string) {
    const filesToCreate = [
        `${entityName}.controller.ts`,
        `${entityName}.model.ts`,
        `${entityName}.service.ts`,
        `${entityName}.interface.ts`,
        `${entityName}.dto.ts`
    ];

    for (const fileName of filesToCreate) {
        const filePath = path.join(folderPath, fileName);

        if (fs.existsSync(filePath)) {
            vscode.window.showWarningMessage(`${fileName} already exists.`);
            continue;
        }

        fs.writeFileSync(filePath, fileTemplates(fileName, entityName));
        vscode.window.showInformationMessage(`${fileName} created in ${folderPath}`);
    }
}
