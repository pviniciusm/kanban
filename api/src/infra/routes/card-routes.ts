import { mapRequest } from "./../util/request-mapper";
import { makeControllers } from "./../../presentation/util/factory/card-controllers.factory";
import { Request, Response, Router } from "express";

export class CardRoutes {
    static getRoutes() {
        const controllers = makeControllers();
        const routes = Router();

        routes.get("/teste", async (req: Request, res: Response) => {
            const result = await controllers.list.handle(req);
            res.status(200).send(result);
        });

        routes.get("/teste2", (req, res) =>
            mapRequest(req, res, controllers.list)
        );

        return routes;
    }
}
