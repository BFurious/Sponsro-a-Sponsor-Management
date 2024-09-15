import { config } from "dotenv";

export class ENV_VARIABLES {
    PORT ='';
    MONGO_URI ='';
    constructor(){
        config();
        this.PORT = process.env.PORT;
        this.MONGO_URI= process.env.MONGO_URI
    }
}