module.exports = {
    type: "sqlite",
    database: "dev.sqlite3",
    entities: ["src/infra/database/typeorm/entities/*.ts"],
    migrations: ["src/infra/database/typeorm/migrations/*.ts"],
    logging: false,
    synchronize: false,
    cli: {
        entitiesDir: "src/infra/database/typeorm/entities",
        migrationsDir: "src/infra/database/typeorm/migrations",
    },
};
