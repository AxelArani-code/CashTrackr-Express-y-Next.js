import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { Validate } from "sequelize-typescript";
import { validateExpenseInput } from "../middleware/expense";


const router = Router()

//Llamado los Middle, automaticamente a los Params
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

//Metodo de HTTP que llama direfernte controller 
router.get('/', BudgetController.getAll) //Obtener Todos los productos
router.post('/',
    validateBudgetInput,
    BudgetController.create) //Crear un producto 

//Router Dinamico 
router.get('/:budgetId',BudgetController.getById)//Obtener un producto en ID 


router.put('/:budgetId',
    //Validamos el Body 
   validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById)//Editar un Producto 


router.delete('/:budgetId', BudgetController.delateById)//Eliminar un Producto 

//Router for expenses patron RUA 


router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors, 
    ExpensesController.create)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)


export default router