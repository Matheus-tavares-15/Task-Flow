import { Task } from "../Interface/task";
export declare class TaskClass {
    htmlTemplate: HTMLTemplateElement;
    divContentPending: HTMLDivElement;
    divContentCompleted: HTMLDivElement;
    divContentvencido: HTMLDivElement;
    divContentfuturo: HTMLDivElement;
    modal: HTMLElement;
    modalAdd: HTMLElement;
    result: Task[];
    constructor();
    private setupEventListeners;
    private processarNovo;
    private processarEdicao;
    modalEdit(id: string): void;
    addNewTask(): void;
    criarElemento(clone: DocumentFragment, dados: Task, div: HTMLDivElement, dataFormatada?: string): void;
    renderElementesComplete(): Promise<void>;
    addTask(obj: Task): Promise<void>;
    atualizarDados(editObj: Task): Promise<void>;
    deleteitem(id: string): Promise<void>;
    addCompleteOrPending(id: string): Promise<void>;
    getData(): Promise<void>;
    resultadoConsulta(res: Response): Promise<void>;
    desativaModal(id: string): void;
    checkeditem(id: string): void;
}
//# sourceMappingURL=task.d.ts.map