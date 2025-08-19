import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";

const router = Router()

router.use(limiter)


router.post('/create-account', 
    body('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
    .isLength({min: 8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('email')
    .isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.createAccount)


    router.post('/confirm-account', 
        limiter,
        body('token')
        .notEmpty()
        .isLength({min:6, max:6})
        .withMessage('Token no valido'),
        handleInputErrors,
        AuthController.confirmAccount

    )


    router.post('/login',
        body('email')
        .isEmail().withMessage('Emial no valido'),
        body('password')
        .notEmpty().withMessage('El password no valido'),
        handleInputErrors,
        AuthController.login
    )

    router.post('/forgot-password',

        body('email')
        .isEmail().withMessage('Email no valido'),
        handleInputErrors,
        AuthController.forgotPassword
    )

export default router 