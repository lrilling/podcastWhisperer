import sqlite3 from "sqlite3";

export default class SQLiteConnector {
    constructor(name = "myDatabase.db") {
        this.db = new sqlite3.Database(name, (err) => {
            if (err) {
                console.log("Database connection lead to some error: ", err);
            }

            console.log(`Connected to database ${name}`);
        });
    }

    createTable(name, keys) {
        let sql = `CREATE TABLE IF NOT EXISTS ${name} (id INTEGER PRIMARY KEY,`;

        keys.forEach((k, i) => {
            sql += k
            if (i < keys.length - 1) {
                sql += ",";
            }
        });
        sql += ");";

        this.db.exec(sql);
    }

    addEntry(tableName, entry) {

    }

    removeEntry(tableName, entryID) {

    }

    getEntry(tableName, entryID) {

    }

    setEntry(tableName, entryID, changes) {

    }
}