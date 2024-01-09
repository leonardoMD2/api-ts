import { Request, Response } from "express";
import { Sector } from "../models/sector";

interface Sector{
    id?:number, 
    name?:string
}

export const postSectors = async (req:Request, res:Response):Promise<void> => {

    const sector:Sector = {

        name:req.body.name

    }
    
    if(sector.name){
        
        await Sector.create({name:sector.name})
        res.send({msg:`New sector created: ${sector.name}`})
    
    }
}

export const getSectors = async (req:Request, res:Response):Promise<void> => {
    
    const allSectors:object | null = await Sector.findAll()
    
    if(allSectors){

        res.json(allSectors)

    }else{

        res.send({msg:"No hay sectores"})

    }

}

export const deleteSectors = async (req:Request, res:Response):Promise<void> => {
    
    const sectorToDelete:Sector = {

        id: req.body.id

    }

    const sectorToDeleteFinded:object | null = await Sector.findByPk(sectorToDelete.id)
    
    if(sectorToDelete.id && sectorToDeleteFinded){
        
        await Sector.destroy({where:{id:sectorToDelete.id}})
        res.status(200).send({msg:"Sector eliminado"})

    }else{

        res.status(404).send({msg:"No se encuentra el sector"})

    }
}

export const putSectors = async (req:Request, res:Response):Promise<void> => {
    
    const sectorToPut:Sector={
        id:req.body.id,
        name: req.body.name
    }
    
    const sectorToPutFinded:object | any = await Sector.findByPk(sectorToPut.id)
    
    if(sectorToPutFinded){

        await Sector.update({name:sectorToPut.name},{where:{
            id:sectorToPutFinded.id
        }})

        res.status(200).send({msg:"Sector modificado"})

    }else{

        res.status(404).send({msg:"No se encuentra el sector"})
    
    }
}