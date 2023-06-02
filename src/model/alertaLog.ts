import { ObjectId } from "mongodb";

export default class AlertaLog {
    constructor(public alertaAtivo: Boolean, public data: Date, public _id?: ObjectId){}
}