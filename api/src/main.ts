import { database } from "./infra/database/typeorm/connection";
import { Server } from "./infra/server";
import safe from "dotenv-safe";

database
    .init()
    .then(Server.init)
    .then(() => safe.config());
