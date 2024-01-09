import { User } from "../models/user";
import { Sector } from "../models/sector";
import { Request, Response } from "express";

interface Usuario{

    name:string,
    lastname:string,
    sector:string

}

export const getUsers = async (req:Request,res:Response) => {
    
    const allUsers:object | null = await User.findAll({include:{all:true}})
    res.json(allUsers)

}

export const postUsers = async (req:Request,res:Response) => {
    
    const user :Usuario = {
        name: req.body.name,
        lastname: req.body.lastname,
        sector: req.body.sector
    }

    if(user.name && user.lastname && user.sector){

        const sectorFinded:object | any = await Sector.findOne({where:{name:user.sector}})
        const userFinded:object | any = await User.findOne({where:{name:user.name, lastname:user.lastname}})
        
        if(sectorFinded && !userFinded){

            await User.create({name:user.name, lastName:user.lastname,sectorId:sectorFinded.id})
            res.send({msg:`New user created: ${user.name} - ${user.lastname}`})

        }else{
        
            res.send({msg:"Error, ese usuario ya existe"})

        }
    }else{

        res.send({msg:"Error, faltan datos"})

    }

}