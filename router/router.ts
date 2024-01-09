import { Router } from "express"
import { getUsers, postUsers } from "../controller/users"
import { getSectors, postSectors, deleteSectors, putSectors } from "../controller/sectors"

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.post("/", postUsers)

const sectorRouter = Router()

sectorRouter.get("/", getSectors)
sectorRouter.post("/", postSectors)
sectorRouter.delete("/deleteSector", deleteSectors)
sectorRouter.put("/putSector", putSectors)

export{
    userRouter,
    sectorRouter
}