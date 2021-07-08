import { getCustomRepository } from 'typeorm';

import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // Gerar token com chave secreta aleatória
        const token = sign(
            {
                email: user.email
            }, 
            "9d292efc5018144a5cb703e32e0408cf", 
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );

        return token;
    }
}

export { AuthenticateUserService };