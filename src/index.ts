import express from "express";
import { connectToDatabase } from "./services/database.service"
import { alertaRouter } from "./routes/alerta.router";
import * as dotenv from "dotenv";
(async () => {
    try {
        await connectToDatabase();
        dotenv.config();
        const port = process.env.PORT
        const app = express()

        app.use("/alerta", alertaRouter)

        app.listen(port, () => {
            console.log(`Servidor iniciado em http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Conexão com o banco de dados falhou\n", error);
        process.exit(100);
    }
})();