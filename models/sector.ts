import { db } from "../db/db";
import { DataTypes } from "sequelize";

export const Sector = db.define("sector",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING
        }
    },{
        timestamps:false
    });
