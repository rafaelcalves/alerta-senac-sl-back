import * as express from "express"
import * as cors from "cors"
import { collections } from "../services/database.service"
import AlertaLog from "../model/alertaLog"

export const alertaRouter = express.Router();
alertaRouter.use(express.json())
alertaRouter.use(cors())

let alertaAtivo = false

alertaRouter.get('/status', (req, res) => {
    res.send({data: alertaAtivo})
})

alertaRouter.get('/logs', async (req, res) => {
    try {
        const alertas = (await collections.alertas.find({}).toArray()) as AlertaLog[];
 
         res.status(200).send(alertas);
     } catch (error) {
         res.status(500).send(error.message);
     }
})


alertaRouter.post('/', async (req, res) => {
    try {
        inverteEstadoBotao()
    } catch (error) {
        console.error(error);
        res.status(500).send("Não foi possível ativar o alarme devido a uma falha no sistema!\n" + error.message);
    }
    try {
        const alertaLog = new AlertaLog(alertaAtivo, new Date());
        const result = await collections.alertas.insertOne(alertaLog);

        result
            ? res.status(201).send(`Log de alerta criado com sucesso - id: ${result.insertedId}`)
            : res.status(500).send("O Alerta foi ativado, mas ocorreu uma falha ao gerar o log de alerta.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
})

function inverteEstadoBotao() {
    alertaAtivo = !alertaAtivo
}