import express from 'express'
import { MetodosTask } from './Classes/taskMethod.js'
const app = express()
import cors from 'cors';

const Dados = new MetodosTask()

app.use(express.json())

app.use(cors());

app.listen(3000, (error) => {

    if (error) throw console.log(error)


})

app.get('/', async (req, res) => {
    const dados = await Dados.GetData()
    res.json(dados)
})

app.patch('/status/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Dados.pach(id)
        if (result.status === 200) {
            res.status(200).send(result.menssage)
        } else {
            res.status(500).send(result.menssage)
        }

    } catch (error) {

        res.send(error).status(500)
    }

})

app.put("/", async (req, res) => {

    try {
        const result = await Dados.pull(req.body)
        if (result.status === 200) {
            res.status(200).send(result.menssage)
        } else {
            res.status(500).send(result.menssage)
        }


    } catch (error) {
        res.status(500).send(error)
    }


})

app.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const result = await Dados.delete(id)
        if (result.status === 200) {
            res.status(200).send(result.menssage)
        } else {
            res.status(500).send(result.menssage)
        }

    } catch (error) {
        console.log("error")
        res.send(error).status(500)
    }

})


app.post("/", async (req, res) => {

    try {
        const dados = req.body
        console.log(dados)
        const result = await Dados.createTask(dados)
        if (result?.status === 200) {
            res.status(200).send(result.menssage)
        } else {
            res.status(500).send(result?.menssage)
        }

    } catch (error) {

        res.send(error).status(500)
    }


})