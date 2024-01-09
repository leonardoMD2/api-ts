import { db } from "../db/db";
import { DataTypes } from "sequelize";


    
export const User = db.define("user",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING
        },
        lastName:{
            type: DataTypes.STRING
        }
    },{
        timestamps:false
    });


   
    
    