import { Task } from "../Interface/task.js";
export declare class MetodosTask {
    Data: Task[];
    constructor();
    init(): Promise<void>;
    GetData(): Promise<any>;
    salvarTask(): Promise<{
        menssage: string;
    }>;
    GetTask(): void | Task[];
    createTask(obj: Task): Promise<{
        menssage: unknown;
        status: number;
    } | undefined>;
    find(id?: string): Task[] | {
        menssage: unknown;
    };
    pull(obj: Task): Promise<{
        menssage: string;
        status: number;
    }>;
    pach(id: string): Promise<{
        menssage: string;
        status: number;
    }>;
    delete(id: string): Promise<{
        menssage: string;
        status: number;
    }>;
}
//# sourceMappingURL=taskMethod.d.ts.map