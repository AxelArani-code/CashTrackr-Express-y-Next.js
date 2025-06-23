import type { Request, Response } from "express"
import User from "../models/User"


export class AuthController{
    static createAccount = async (req: Request, res: Response)=>{
        const {email}= req.body
        //Prevenir duplicados
        const userExists = await User.findOne({where: {email}})
        if(userExists){
            const error =  new Error('El usuario ya existe')
            res.status(409).json({error: error.message})
             
        }
       
        
        try {
            const user = new User(req.body)
            await user.save()
            res.json('Cuenta Creada Correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }

    }
}