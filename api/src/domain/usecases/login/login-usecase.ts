import { InvalidCredentialsError } from "../../util/errors/unauthorized-error";
import { Auth } from "../../entities/login";
import { UseCase } from "./../index";

export interface LoginParams {
    login: string;
    senha: string;
}

export interface LoginReturn {
    login: string;
}

export class LoginUseCase implements UseCase {
    private getLoginList = (): Auth[] => {
        return [{ login: process.env.LOGIN!, senha: process.env.PASSWORD! }];
    };

    async run(params: LoginParams): Promise<LoginReturn> {
        const login = this.getLoginList()[0];

        if (login.login !== params.login || login.senha !== params.senha) {
            throw new InvalidCredentialsError();
        }

        return { login: params.login };
    }
}
