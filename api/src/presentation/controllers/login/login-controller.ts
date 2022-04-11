import { success } from "./../../util/handlers/handle-success";
import { IJwtService } from "../../util/contracts/jwt-contract";
import { LoginUseCase } from "./../../../domain/usecases/login/login-usecase";
import { error } from "./../../util/handlers/handle-error";
import { Controller } from "../../util/contracts/controller";
import { HttpRequest, ResponseData } from "../../util/contracts/http-data";

export class LoginController implements Controller {
    constructor(
        private loginUseCase: LoginUseCase,
        private jwtService: IJwtService
    ) {}

    async handle(request: HttpRequest): Promise<ResponseData> {
        try {
            const result = await this.loginUseCase.run({ ...request.body });

            const token = this.jwtService.createToken(result);
            return success(token);
        } catch (e) {
            return error(e);
        }
    }
}
