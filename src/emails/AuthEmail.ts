import { trasnport } from "../config/nodemailer"

type EmailType={
    name: string
    email: string
    token: string
}

export class AuthEmail{
    static sendConfirmationEmail = async(user: EmailType)=>{
        const email = await trasnport.sendMail({
            from: 'CashTracker <hello@demomailtrap.co>',
            to: user.email,
            subject: 'CasTracker - confirmar tu cuenta',
            html: `
            <p>Hola</p>
            `
        })
        console.log(email)
    }
}