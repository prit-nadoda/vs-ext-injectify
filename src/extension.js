"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const createFiles_1 = require("./commands/createFiles"); // Import the function
function activate(context) {
    console.log('Injectify extension activated.');
    // Monitor folder creation logic (assuming you have that in place)
    const apiFolderPath = path.join(vscode.workspace.rootPath || '', 'src', 'api');
    vscode.workspace.onDidCreateFiles((event) => {
        event.files.forEach((file) => {
            const folderPath = file.fsPath;
            // Check if the created file is a folder under ./src/api
            if (folderPath.startsWith(apiFolderPath) && fs.statSync(folderPath).isDirectory()) {
                const entityName = path.basename(folderPath); // Get the folder name (e.g., 'user')
                // Prompt the user for file creation
                vscode.window.showInformationMessage(`Do you want to allow Injectify to inject files in /${entityName}?`, { modal: true }, 'Yes', 'No').then(async (selection) => {
                    if (selection === 'Yes') {
                        // Pass both folderPath and entityName to the function
                        await (0, createFiles_1.createFilesForEntity)(folderPath, entityName);
                    }
                });
            }
        });
    });
    // Register the command to manually create files (optional)
    let disposable = vscode.commands.registerCommand('injectify.createFiles', async (folderPath) => {
        const entityName = path.basename(folderPath); // Extract the entity name from the path
        await (0, createFiles_1.createFilesForEntity)(folderPath, entityName); // Pass both arguments
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map