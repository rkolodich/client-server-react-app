import express, { Request, Response } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router/index.js'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/errorMiddleware.js'
import { CLIENT_URL, DB_URL, PORT } from './constants/env.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin: CLIENT_URL,
	credentials: true
}))
app.use('/api', router)
app.use(errorMiddleware)

const run = async () => {
	await mongoose.connect(DB_URL as string)

	app.listen(PORT, () => {
		console.log(`[server]: Server is running at http://localhost:${PORT}`)
	})
}

run()
