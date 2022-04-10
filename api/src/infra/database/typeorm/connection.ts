import { Connection as TypeConnection, createConnection } from "typeorm";
import { Connection } from "./../index";

class Database implements Connection {
    private _connection: TypeConnection;

    constructor() {}

    async init() {
        if (!this._connection) {
            this._connection = await createConnection();
        }
    }

    getConnection() {
        if (!this._connection) {
            throw new Error("Database is not connected");
        }

        return this._connection;
    }
}

const database = new Database();
export { database };
