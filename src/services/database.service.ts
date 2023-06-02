import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { alertas?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const alertaLogsCollection: mongoDB.Collection = db.collection(process.env.ALERTALOG_COLLECTION_NAME);
 
    collections.alertas = alertaLogsCollection;
       
    console.log(`Conexão concluída ao o banco de dados: ${db.databaseName} e collection: ${alertaLogsCollection.collectionName}`);
 }