import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
     
   await body('name').notEmpty().withMessage('El nombre el gasto es obligatorio').run(req)
   
   await  body('amount').notEmpty().withMessage('La cantidad  del gasto es obligatorio')
          .isNumeric().withMessage('Cantidad no valido')
          .custom(value => value > 0).withMessage('El gasto debe ser mayor a 0 ').run(req)
    next()
}
