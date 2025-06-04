import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget";

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

export default router