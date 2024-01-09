import express, { Application } from "express"
import cors from "cors"
import { userRouter,sectorRouter } from "../router/router";
import { db } from "../db/db"
import { Sector } from "../models/sector";
import { User } from "../models/user";

export class Server{
    private app:Application;
    private port:number | string;
    private apiRouts:object | any = {
        users:"/api/users",
        sectors:"/api/sectors" 
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || "4000"

        this.Middlewares();
        this.startDB();
        this.Router();
    }
    async startDB(){
        try {
            await db.authenticate()
            console.log("Sequelize ON")
        } catch (error) {
            console.log("Error: ", error)
        }
        const userTable = User;
        const sectorTable = Sector;

        userTable.belongsTo(sectorTable);
        sectorTable.hasMany(userTable);

        userTable.sync();
        sectorTable.sync();
    }

    Middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    Router():void{
        this.app.use(this.apiRouts.users,userRouter)
        this.app.use(this.apiRouts.sectors,sectorRouter)
    }

    Listen():void{
        this.app.listen(this.port, () =>{
            console.log("Running at:", this.port)
        })
    }
}