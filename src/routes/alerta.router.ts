import * as express from 'express'
import * as cors from 'cors'

export const alertaRouter = express.Router();
alertaRouter.use(express.json())
alertaRouter.use(cors())

let alertaAtivo = false

alertaRouter.get('/', (req, res) => {
    res.send({data: alertaAtivo})
})

alertaRouter.post('/alerta', (req, res) => {
    inverteEstadoBotao()
})

function inverteEstadoBotao() {
    alertaAtivo = !alertaAtivo
}