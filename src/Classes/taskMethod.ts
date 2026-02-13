import { Task } from "../Interface/task.js";
import fs from 'node:fs/promises'




export class MetodosTask {

    Data: Task[]

    constructor() {
        this.Data = []
        this.init()
    }

    public async init() {
        await this.GetData()
    }

    public async GetData() {

        try {
            const data = await fs.readFile("./dist/data/data.json", "utf-8");
            return this.Data = JSON.parse(data)

        } catch (err) {
            return { menssage: `Erro ao ler arquivo: ${err}` }
        }

    }

    public async salvarTask() {

        await fs.writeFile("./dist/data/data.json", JSON.stringify(this.Data, null, 2))
        return { menssage: "Arquivo Salvo com Sucesso!!" }

    }

    public GetTask() {
        try {
            return this.Data

        } catch (error) {
            return console.log(error)
        }
    }


    public async createTask(obj: Task) {

        try {
            if (obj) {
                this.Data.push(obj)
                await this.salvarTask()
                return { menssage: "objeto criado com sucesso", status: 200 }
            }

        } catch (error) {
            return { menssage: error, status: 500 }
        }


    }

    public find(id?: string) {

        try {
            if (id) {
                return this.Data.filter(value => value.id === id)
            } else {
                return { menssage: "Nenhum resultado encontrado!" }
            }


        } catch (erro) {
            return { menssage: erro }
        }

    }

    public async pull(obj: Task) {

        const dado = this.Data.findIndex(value => value.id === obj.id)
        if (dado !== -1) {

            this.Data[dado] = { ...obj }
            await this.salvarTask()
            return { menssage: 'ATUALIZAÇÃO REALIZADA COM SUCESSO', status: 200 }


        } else {
            return { menssage: 'ERRO AO TENTAR REALIZAR ATUALIZAÇÃO', status: 500 }
        }


    }

    public async pach(id: string) {

        const dado = this.Data.findIndex(value => value.id === id)
        if (dado !== -1) {
            this.Data[dado]!.status = this.Data[dado]?.status === "completed" ? "pending" : "completed"
            await this.salvarTask()
            return { menssage: 'ATUALIZAÇÃO REALIZADA COM SUCESSO', status: 200 }


        } else {
            return { menssage: 'ERRO AO TENTAR REALIZAR ATUALIZAÇÃO', status: 500 }
        }


    }

    public async delete(id: string) {
        const validador = this.Data.findIndex(value => value.id === id)
        if (validador !== -1) {
            this.Data = this.Data.filter(data => data.id !== id)
            await this.salvarTask()
            return { menssage: "Item apagado", status: 200 }
        } else {
            return { menssage: "Nenhum elemento com esse id foi encontrado", status: 500 }

        }


    }


} 