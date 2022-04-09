import express from "express";
import cors from "cors";

export class Server {
    private static _app = express();

    static init() {
        Server._app.use(cors());
        Server._app.listen(process.env.API_PORT || 8081, () =>
            console.log("Server is running")
        );
    }
}
