import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";

import { router } from './routes';

import "./database";

// @types/express
const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

/**
 * GET      => Buscar
 * POST     => Inserir
 * PUT      => Alterar
 * DELETE   => Remover
 * PATCH    => Alterar (específico)
 */

/**
 * Tipos de parâmetros
 * Routes Params => http://localhost:3000/produtos/2837298375
 * Query Params => http://localhost:3000/produtos?name=teclado&description=tecladobom&
 * 
 * Body Params => {
 *  "name": "teclado",
 *  "description": "teclado bom"
 * }
 */

// http://localhost:3000
app.listen(3000, () => console.log("Server is running NLW"));