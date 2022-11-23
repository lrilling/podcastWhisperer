import SQLiteConnector from "./dbConnector.js";

it("table creation string", async () => {
    const connector = new SQLiteConnector();
    await connector.createTable("test", ["name", "password", "bla"]);

    connector.db.get("SELECT name FROM SQLite_master WHERE type='table' AND name='test';", (err, table) => {
        if (!err) {
            expect(table.name).toBe("test")
        }
    });

    connector.db.exec("DROP TABLE test;");
});