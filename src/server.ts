import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from'./routes/budgetRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexion exitosa a la Base De Datos'))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Fallo la conexion a la Base De Datos'))
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

//agregar
app.use('/api/budgets', budgetRouter)



export default app