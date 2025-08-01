import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Budget from '../models/Budget'

declare global{
    namespace Express{
        interface Request{
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
   await param('budgetId')
   .isInt().withMessage('ID no válido')
   .custom(value => value > 0)
   .withMessage('ID no válido').run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    next()
}


export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
   try {
            const {budgetId} = req.params
            const budget = await Budget.findByPk(budgetId)
            if(!budget){
                const error = new Error('Presupuesto no encontrado')

                 res.status(404).json({error: error.message})
            }
            //Pasamo el budget a la reQuest por interface 
            req.budget = budget
            next()
        } catch (error) {
            res.status(500).json({error: 'Hubo un error '})
        }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
     
   await body('name').notEmpty().withMessage('El nombre del presupuesto es obligatorio').run(req)
    await  body('amount').notEmpty().withMessage('La cantidad  del presupuesto es obligatorio')
          .isNumeric().withMessage('Cantidad no valido')
          .custom(value => value > 0).withMessage('El presupuesto debe ser mayor a 0 ').run(req)


     const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    next()
}
