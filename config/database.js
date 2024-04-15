import { Mongoose, connect } from "mongoose"
import { ENV_VARIABLES } from "./envVariables";

export class DATABASE {
    envVariables = new ENV_VARIABLES()
    constructor() {
        connect(this.envVariables.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
         .then(()=>{ console.log("Mongo Connected")})
         .catch((err)=>{ console.log(`mongo Error: ${err.message}`)});
    }
}