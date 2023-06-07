import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import AlertaLog from "../model/alertaLog";

export const collections: { alertas?: mongoDB.Collection<AlertaLog> } = {}

export async function connectToDatabase () {
    dotenv.config();
    if(!process.env.DB_CONN_STRING) throw new Error("Não há DB_CONN_STRING no .env")
    if(!process.env.ALERTALOG_COLLECTION_NAME) throw new Error("Não há ALERTALOG_COLLECTION_NAME no .env")
    if(!process.env.DB_NAME) throw new Error("Não há DB_NAME no .env")

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const alertaLogsCollection: mongoDB.Collection<AlertaLog> = db.collection(process.env.ALERTALOG_COLLECTION_NAME);
 
    collections.alertas = alertaLogsCollection;
       
    console.log(`Conexão concluída ao o banco de dados: ${db.databaseName} e collection: ${alertaLogsCollection.collectionName}`);
 }