import express from 'express'
const app = express()


// route
import  tourRoute from './routes/noteRoute.js'



// Middlerwares

app.use(express.json())
app.use('/api', tourRoute)



export default app;