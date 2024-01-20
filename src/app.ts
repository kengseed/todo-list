import express, { Express, Request, Response } from 'express'
import todoRouter from './routes/todo.router'

// Create instance and variables
const app: Express = express(); 
const apiVersion: string = "/api/v1";
const port: number = 3030

// Config API message body 
app.use(express.json());

// Config API Router
app.use(apiVersion, todoRouter);


app.listen(port, () => console.log(`NodeJS is running on port ${port}`)); 

