import { mapRequest } from "../../util/request-mapper";
import { makeControllers } from "../../../presentation/util/factory/card-controllers-factory";
import { Request, Response, Router } from "express";
import { removeUpdateMiddleware } from "../middlewares/log-middleware";

export class CardRoutes {
    static getRoutes() {
        const controllers = makeControllers();
        const routes = Router();

        routes.get("/", (req, res) => mapRequest(req, res, controllers.list));
        routes.post("/", (req, res) =>
            mapRequest(req, res, controllers.create)
        );

        routes.put(
            "/:id",
            [removeUpdateMiddleware],
            (req: Request, res: Response) =>
                mapRequest(req, res, controllers.update)
        );
        routes.delete(
            "/:id",
            [removeUpdateMiddleware],
            (req: Request, res: Response) =>
                mapRequest(req, res, controllers.delete)
        );

        return routes;
    }
}
