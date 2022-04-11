import { authorizationMid } from "../middlewares/auth-middleware";
import { CardRoutes } from "./card-routes";
import { LoginRoutes } from "./login-routes";

export const setRoutes = (app: any) => {
    app.use("/cards", [authorizationMid], CardRoutes.getRoutes());
    app.use("/login", LoginRoutes.getRoutes());
};
