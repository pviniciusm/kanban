import { database } from "./infra/database/typeorm/connection";
import { Server } from "./infra/server";

database.init().then(Server.init);
