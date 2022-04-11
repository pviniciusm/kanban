import express, { json } from "express";
import cors from "cors";
import { setRoutes } from "./routes";

export class Server {
    private static _app = express();

    static init() {
        Server._app.use(cors());
        Server._app.use(json());
        setRoutes(Server._app);

        Server._app.listen(process.env.API_PORT || 8081, () =>
            console.log("Server is running")
        );
    }
}
