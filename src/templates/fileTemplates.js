"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTemplates = fileTemplates;
function fileTemplates(fileName, entityName) {
    switch (fileName) {
        case `${entityName}.controller.ts`:
            return `import { Request, Response } from 'express';\n\nexport class ${capitalize(entityName)}Controller {\n  // Controller methods\n}`;
        case `${entityName}.model.ts`:
            return `export interface ${capitalize(entityName)} {\n  // Model properties\n}`;
        case `${entityName}.service.ts`:
            return `import { ${capitalize(entityName)} } from './${entityName}.model';\n\nexport class ${capitalize(entityName)}Service {\n  // Service methods\n}`;
        case `${entityName}.dto.ts`:
            return `export class Create${capitalize(entityName)}Dto {\n  // DTO properties\n}`;
        case `${entityName}.interface.ts`:
            return `export interface ${capitalize(entityName)}Interface {\n  // Interface methods\n}`;
        default:
            return '';
    }
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//# sourceMappingURL=fileTemplates.js.map