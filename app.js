import express from 'express'
const app = express()
const port = 3000

// route
import  tourRoute from './routes/noteRoute.js'



// Middlerwares

app.use(express.json())
app.use('/api', tourRoute)



export default app;