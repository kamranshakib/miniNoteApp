import express from 'express'
const app = express()
import tourRoute from './routes/noteRoute.js'

app.use(express.json())
app.use('/api', tourRoute)

export default app;