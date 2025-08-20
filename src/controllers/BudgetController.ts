//utilizamos metodos estaticos 
import type { Request, Response } from "express"
import Budget from "../models/Budget"
import Expense from "../models/Expense"

export class BudgetController{
    static getAll = async (req: Request, res: Response)=>{
      try {
          const budgets = await Budget.findAll({
            //Aplicar, filtros, ordenes, etc 
            order: [
                ['createdAt', 'DESC']
            ], 
           //TODO: Filtara pro el usuario autenticado
           where:{
            userId: req.user.id
           }
          })

          res.json(budgets)
      } catch (error) {
        res.status(500).json({error: 'Hubo un error '})
      }
    }


    static create = async (req: Request, res: Response)=>{
        //Ingresar los datos 
        try {
            const budget = new Budget(req.body)
            budget.userId = req.user.id

            await budget.save()
            res.status(201).json('Presupuesto Creado Correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error '})
            
        }
    }

    static getById = async (req: Request, res: Response)=>{
          const budget = await Budget.findByPk(req.budget.id,{
            include: [Expense]
        })
        if(req.budget.userId !== req.user.id)
        res.json({
          budget:req.budget,
          user: req.user
        })
        res.json(budget)
    }

    static updateById = async (req: Request, res: Response)=>{
         //   Scribir los cambio del body 
           await req.budget.update(req.body)
           res.json('Presupuesto actualizado Correctamente')
    }

    static delateById = async (req: Request, res: Response)=>{
        
           await req.budget.destroy()
           res.json('Presupuesto Eliminado Correctamente')    
    }
}