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
exports.monitorFolderCreation = monitorFolderCreation;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const createFiles_1 = require("../commands/createFiles");
function monitorFolderCreation(context) {
    const apiFolderPath = path.join(vscode.workspace.rootPath || '', 'src', 'api');
    if (!fs.existsSync(apiFolderPath)) {
        return vscode.window.showErrorMessage('The "src/api" folder does not exist.');
    }
    // Watch for new directories
    fs.watch(apiFolderPath, { recursive: true }, (eventType, filename) => {
        if (eventType === 'rename' && filename) {
            const newFolderPath = path.join(apiFolderPath, filename);
            if (fs.statSync(newFolderPath).isDirectory()) {
                promptForFileInjection(newFolderPath);
            }
        }
    });
}
async function promptForFileInjection(folderPath) {
    const folderName = path.basename(folderPath);
    const userResponse = await vscode.window.showInformationMessage(`Do you want to allow Injectify to inject files in /${folderName}?`, { modal: true }, 'Yes', 'No');
    if (userResponse === 'Yes') {
        await (0, createFiles_1.createFilesForEntity)(folderPath, folderName);
    }
}
//# sourceMappingURL=fileUtils.js.map