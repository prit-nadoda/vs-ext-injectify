export function fileTemplates(fileName: string, entityName: string): string {
    switch (fileName) {
        case `${entityName}.controller.ts`:
            return `import { Get, JsonController } from "routing-controllers";
import { ${capitalize(entityName)}Service } from "./${entityName}.service";
import Container from "typedi";
import { IExtendedRequest } from "../../utils/common/common-types";

@JsonController("/${entityName}")
export default class ${capitalize(entityName)}Controller {
    protected _${entityName.toLowerCase()}Service: ${capitalize(entityName)}Service;

    constructor() {
        this._${entityName.toLowerCase()}Service = Container.get(${capitalize(entityName)}Service);
    }

    @Get("/${entityName}-info", { transformRequest: true })
    async ${capitalize(entityName)}Info() {
        try {
            // controller logic goes here
        } catch (error) {
            throw error;
        }
    }
}
`;

        case `${entityName}.model.ts`:
            return `import * as mongoose from "mongoose";
import { I${capitalize(entityName)} } from "./${entityName}.interface";

const ${entityName}Schema: mongoose.Schema<I${capitalize(entityName)}> = new mongoose.Schema(
    {
        name: String,
    },
    { timestamps: true }
);

const ${entityName}Model = mongoose.model<I${capitalize(entityName)}>("${entityName}s", ${entityName}Schema);
export default ${entityName}Model;
`;

        case `${entityName}.dto.ts`:
            return `import {
    IsDefined,
    IsString,
    IsNotEmpty,
} from "class-validator";
export class Add${capitalize(entityName)}Payload {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string | undefined;
}
`;

        case `${entityName}.service.ts`:
            return `import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { Service } from "typedi";
import { I${capitalize(entityName)} } from "./${entityName}.interface";
import ${entityName}Model from "./${entityName}.model";

@Service()
export class ${capitalize(entityName)}Service {
    private model: Model<I${capitalize(entityName)}>;

    constructor() {
        this.model = ${entityName}Model;
    }

    async save(item: any): Promise<I${capitalize(entityName)}> {
        return await this.model.create(item);
    }

    async find(
        query: FilterQuery<I${capitalize(entityName)}>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ) {
        return await this.model.find(query, projection, options).lean();
    }

    async findOne(
        query: FilterQuery<I${capitalize(entityName)}>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<any> {
        return this.model.findOne(query, projection, options);
    }

    async findOneAndUpdate(
        query: FilterQuery<I${capitalize(entityName)}>,
        updateData: UpdateQuery<I${capitalize(entityName)}>,
        options: QueryOptions = { lean: true }
    ) {
        return await this.model.findOneAndUpdate(query, updateData, options);
    }

    async findByIdAndUpdate(
        query: FilterQuery<I${capitalize(entityName)}>,
        updateData: UpdateQuery<I${capitalize(entityName)}>,
        options: QueryOptions = { lean: true }
    ) {
        return await this.model.findByIdAndUpdate(query, updateData, options);
    }

    async aggregate(pipeLine: any[]): Promise<any> {
        try {
            return await this.model.aggregate(pipeLine);
        } catch (err) {
            return err;
        }
    }

    async findByIdAndDelete(
        query: FilterQuery<I${capitalize(entityName)}>,
        options: QueryOptions = { lean: true }
    ) {
        return await this.model.findByIdAndDelete(query, options);
    }

    async countDocuments(condition: any): Promise<number> {
        return await this.model.countDocuments(condition);
    }
}
`;

        case `${entityName}.interface.ts`:
            return `import { Document } from "mongoose";
export interface I${capitalize(entityName)} extends Document {
    name: string;
}
`;

        default:
            return '';
    }
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
