import { LoginController } from "./../../controllers/login/login-controller";
import { LoginUseCase } from "../../../domain/usecases/login/login-usecase";
import { JwtService } from "../../../infra/services/jwt-service";

export const makeLoginController = () => {
    // Usecases
    const loginUseCase = new LoginUseCase();

    // Services
    const jwtService = new JwtService();

    // Controllers
    const loginController = new LoginController(loginUseCase, jwtService);

    return {
        login: loginController,
    };
};
