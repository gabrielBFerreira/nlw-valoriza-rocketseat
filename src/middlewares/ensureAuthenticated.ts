import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o token
    const authToken = request.headers.authorization;
    
    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Validar se token é valido
        const { sub } = verify(token, "9d292efc5018144a5cb703e32e0408cf") as IPayload;

        // Recuperar informações do usuário = a propriedade sub(ject) do objeto do token equivale ao id do usuario
        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}