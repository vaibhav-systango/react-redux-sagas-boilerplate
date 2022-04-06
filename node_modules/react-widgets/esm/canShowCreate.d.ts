import { AllowCreate } from './shared';
import { Accessors } from './Accessors';
interface Options {
    searchTerm?: string;
    data: readonly unknown[];
    dataItems?: readonly unknown[];
    accessors: Accessors;
}
export default function canShowCreate(allowCreate: AllowCreate, { searchTerm, data, dataItems, accessors }: Options): boolean;
export {};
//# sourceMappingURL=canShowCreate.d.ts.map