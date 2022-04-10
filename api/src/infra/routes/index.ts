import { CardRoutes } from "./card-routes";

export const setRoutes = (app: any) => {
    app.use("/card", CardRoutes.getRoutes());
};
