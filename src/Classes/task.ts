import { Task } from "../Interface/task"

const url = "http://localhost:3000/"

export class TaskClass {
    htmlTemplate: HTMLTemplateElement
    divContentPending: HTMLDivElement
    divContentCompleted: HTMLDivElement
    divContentvencido: HTMLDivElement
    divContentfuturo: HTMLDivElement
    modal: HTMLElement
    modalAdd: HTMLElement
    result: Task[]

    constructor() {
        this.result = []
        this.htmlTemplate = document.getElementById('list')! as HTMLTemplateElement
        this.divContentPending = document.getElementById('Content-Pending')! as HTMLDivElement
        this.divContentCompleted = document.getElementById('Content-completed')! as HTMLDivElement
        this.divContentvencido = document.getElementById('content-vencido')! as HTMLDivElement
        this.divContentfuturo = document.getElementById('content-futuro')! as HTMLDivElement
        this.modal = document.getElementById("modal-edit") as HTMLElement
        this.modalAdd = document.getElementById("modal-add") as HTMLElement

        this.setupEventListeners()
        this.renderElementesComplete()
    }

    private setupEventListeners() {
        // Fechar modais nos botões cancelar
        document.getElementById("btn-cancel")?.addEventListener("click", () => this.desativaModal("modal-edit"))
        document.getElementById("btn-cancel-add")?.addEventListener("click", () => this.desativaModal("modal-add"))

        // Fechar ao clicar no fundo (overlay)
        this.modal.addEventListener("click", (e) => e.target === this.modal && this.desativaModal("modal-edit"))
        this.modalAdd.addEventListener("click", (e) => e.target === this.modalAdd && this.desativaModal("modal-add"))

        // Configuração ÚNICA de Submits para evitar duplicados
        document.getElementById("form-add")?.addEventListener("submit", (event) => {
            event.preventDefault()
            this.processarNovo()
        })

        document.getElementById("form-edit")?.addEventListener("submit", (event) => {
            event.preventDefault()
            this.processarEdicao()
        })
    }

    // --- MÉTODOS DE COLETA (Lêem o formulário e chamam a API) ---

    private async processarNovo() {
        const form = document.getElementById("form-add") as HTMLFormElement
        const novaTarefa: Task = {
            id: crypto.randomUUID().toString(),
            title: (form.querySelector("#titulo") as HTMLInputElement).value,
            description: (form.querySelector("#description") as HTMLInputElement).value,
            status: "pending",
            date: (form.querySelector("#date") as HTMLInputElement).value
        }
        await this.addTask(novaTarefa)
    }

    private async processarEdicao() {
        const id = (document.getElementById("edit-id") as HTMLInputElement).value
        const original = this.result.find(t => t.id === id)

        if (original) {
            const editObj: Task = {
                id: id,
                title: (document.getElementById("edit-title") as HTMLInputElement).value,
                description: (document.getElementById("edit-description") as HTMLInputElement).value,
                status: original.status,
                date: (document.getElementById("edit-date") as HTMLInputElement).value
            }
            await this.atualizarDados(editObj)
        }
    }

    // --- MÉTODOS DE INTERFACE (Abrem e preenchem modais) ---

    public modalEdit(id: string) {
        const tarefa = this.result.find(g => g.id === id)
        if (tarefa) {
            this.modal.classList.remove("hidden");
            (document.getElementById("edit-id") as HTMLInputElement).value = tarefa.id;
            (document.getElementById("edit-title") as HTMLInputElement).value = tarefa.title;
            (document.getElementById("edit-description") as HTMLInputElement).value = tarefa.description;
            (document.getElementById("edit-date") as HTMLInputElement).value = tarefa.date
        }
    }

    public addNewTask() {
        this.modalAdd.classList.remove('hidden');
        (document.getElementById("form-add") as HTMLFormElement).reset()
    }

    // --- MÉTODOS DE RENDERIZAÇÃO ---

    public criarElemento(clone: DocumentFragment, dados: Task, div: HTMLDivElement, dataFormatada?: string) {
        const divTask = clone.querySelector('#task') as HTMLDivElement
        const divCheckInput = divTask.querySelector("#checkbox") as HTMLInputElement
        const divContentTask = divTask.querySelector(".ContentTask") as HTMLDivElement
        const divreward = divTask.querySelector("#reward-task") as HTMLDivElement
        const btnDelete = divTask.querySelector("#delete") as HTMLButtonElement
        const btnEdit = divTask.querySelector("#edit") as HTMLButtonElement
        const dateTask = divTask.querySelector("#date-task") as HTMLParagraphElement

        divTask.id = `task-${dados.id}`

        // Listeners de ação na tarefa
        btnEdit.onclick = (e) => { e.stopPropagation(); this.modalEdit(dados.id) }
        divCheckInput.onclick = (e) => { e.stopPropagation(); this.checkeditem(dados.id) }
        btnDelete.onclick = (e) => { e.stopPropagation(); this.deleteitem(dados.id) }

        divContentTask.querySelector("h3")!.textContent = dados.title
        divContentTask.querySelector("p")!.textContent = dados.description
        dateTask.textContent = "Concluir até: " + dados.date

        divreward.append(btnDelete, btnEdit)

        if (dataFormatada && dados.status === "pending" && dados.date < dataFormatada) {
            dateTask.style.color = "rgba(224, 93, 93, 0.99)"
            dateTask.textContent = "EM ATRASO: " + dados.date
        }

        // Layout de Checked
        if (dados.status === "completed") {
            divCheckInput.checked = true
            divTask.classList.add("task-completed")
            dateTask.textContent = "CONCLUIDO"
        }

        div.appendChild(clone)
    }

    public async renderElementesComplete() {
        await this.getData();
        const d = new Date();
        const dataFormatada = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        // 1. LIMPEZA TOTAL NO INÍCIO
        this.divContentPending.innerHTML = '';
        this.divContentCompleted.innerHTML = '';
        this.divContentvencido.innerHTML = '';
        this.divContentfuturo.innerHTML = '';

    
        // 2. CONTADORES
        let temHj = 0;
        let tempendente = 0;
        let nenhumahj = 0;
        let temfutura = 0;

        // 3. LOOP DE DISTRIBUIÇÃO
        for (const dados of this.result) {
            const clone = document.importNode(this.htmlTemplate.content, true);

            if (dados.status === "pending") {
                if (dados.date === dataFormatada) {
                    temHj += 1;
                    this.criarElemento(clone, dados, this.divContentPending);
                } else if (dados.date < dataFormatada) {
                    tempendente += 1;
                    this.criarElemento(clone, dados, this.divContentvencido, dataFormatada);
                }else{  
                    temfutura += 1;
                    this.criarElemento(clone, dados, this.divContentfuturo, dataFormatada);

                }
            } else if (dados.status === "completed") {
                nenhumahj += 1;
                this.criarElemento(clone, dados, this.divContentCompleted);
            }
        }

        // 4. VALIDAÇÕES FINAIS (SÓ AGORA MOSTRAMOS OS AVISOS)

        if (temHj === 0) {
            const msg = document.createElement("p");
            msg.innerText = tempendente > 0
                ? "Nenhuma tarefa pendente para hoje, conclua as atividades em atraso"
                : "Nenhuma tarefa pendente";
            this.divContentPending.appendChild(msg);
        }

        // Para a seção "VENCIDAS" (Corrigido: divContentvencido)
        if (tempendente === 0) {
            const msgVencida = document.createElement("p");
            msgVencida.innerText = "Nenhuma tarefa vencida";
            this.divContentvencido.appendChild(msgVencida);
        }

        // Para a seção "CONCLUÍDAS" (Garante que a div foi limpa e recebe a msg)
        if (nenhumahj === 0) {
            const msgConcluida = document.createElement("p");
            msgConcluida.innerText = "Nenhuma tarefa Concluída Hoje";
            this.divContentCompleted.appendChild(msgConcluida);
        }

        if(temfutura  === 0 ){
             const msgFutura = document.createElement("p");
            msgFutura.innerText = "Nenhuma tarefa Futura";
            this.divContentfuturo.appendChild(msgFutura);
        }
    }

    // --- MÉTODOS DE API ---

    public async addTask(obj: Task) {
        const res = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        await this.resultadoConsulta(res)
        this.desativaModal("modal-add")
    }

    public async atualizarDados(editObj: Task) {
        const res = await fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editObj)
        })
        await this.resultadoConsulta(res)
        this.desativaModal("modal-edit")
    }

    public async deleteitem(id: string) {
        const res = await fetch(`${url}${id}`, { method: "DELETE" })
        await this.resultadoConsulta(res)
    }

    public async addCompleteOrPending(id: string) {
        const res = await fetch(`${url}status/${id}`, { method: "PATCH" })
        if (res.ok) await this.renderElementesComplete()
    }

public async getData() {
    try {
        const res = await fetch(url);
        if (res.ok) {
            const dados = await res.json();

            // Ordenando do mais recente para o mais antigo
            this.result = dados.sort((a: any, b: any) => {
                // Criamos objetos de data a partir da string "2026-02-13"
                const dataA = new Date(a.date).getTime();
                const dataB = new Date(b.date).getTime();
                
                return dataA - dataB; // Troque para dataA - dataB se quiser os mais antigos primeiro
            });

            console.log("Dados ordenados!", this.result);
        } 
    } catch (e) { 
        console.error("Erro ao buscar dados:", e); 
    }
}

    public async resultadoConsulta(res: Response) {
        const msg = await res.text()
        alert(msg)
        await this.renderElementesComplete()
    }

    public desativaModal(id: string) {
        document.getElementById(id)?.classList.add("hidden")
    }

    public checkeditem(id: string) {
        const el = document.getElementById(`task-${id}`)
        if (el) {
            el.style.opacity = "0"
            setTimeout(() => this.addCompleteOrPending(id), 300)
        }
    }
}