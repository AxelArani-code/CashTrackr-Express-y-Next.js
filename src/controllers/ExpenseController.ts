import type { Request, Response } from 'express'
import Budget from '../models/Budget';
import Expense from '../models/Expense';

export class ExpensesController {
 
  
    static create = async (req: Request, res: Response) => {
     
        try {//Recuperamos el gasto y lo asignamos y almacenamos en la DataBae 
            const budgetId = Number(req.params.budgetId);


    const expense = new Expense({
      ...req.body,
      budgetId, // <- asignación correcta como número
    });

    await expense.save();

    res.status(201).json('Gasto Agregado Correctamente');

        } catch (error) {
          console.error('Error al guardar gasto:', error);
    res.status(500).json({ error: 'Hubo un error al guardar el gasto' });
            
        }
    }
  
    static getById = async (req: Request, res: Response) => {
        res.json(req.expense)
        
    }

    static updateById = async (req: Request, res: Response) => {
 
        await req.expense.update(req.body)
        res.json('Se actualizo Correactamente')
    }
  
    static deleteById = async (req: Request, res: Response) => {
        await  req.expense.destroy()
        res.json('Gasto Eliminado')
    }
}