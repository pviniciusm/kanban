import { makeLoginController } from "../../../presentation/util/factory/login-controller-factory";
import { NextFunction, Request, Response, Router } from "express";

export class LoginRoutes {
    static getRoutes() {
        const controllers = makeLoginController();
        const routes = Router();

        routes.post("/", async (req: Request, res: Response) => {
            const result = await controllers.login.handle({ body: req.body });

            if (result.ok) {
                res.setHeader(
                    "authorization",
                    result.data?.token ? `${result.data.token}` : ""
                );

                delete result.data.token;
            }

            return res.status(result.code).send(result);
        });

        return routes;
    }
}
