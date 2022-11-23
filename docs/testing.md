# Testing
Unit tests are done using [Jest](https://jestjs.io/), which is added to the project using npm:

```
npm install jest
```

After that every module `example.js` can be tested by adding a new file `example.test.js`. 
This file should contain all necessary test functions to test the functionality implemented in `example.js`. 

For example if our file would create a table in a database in a function `createTable(name)` then in the respective test we can check if the table is created by querying the database for that table:

```
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
``` 

`it()` defined the test itself and contains a statement `expect(...).toBe(...)`, which performs the actual testing and compares the content of `expect` with the content of `toBe`. In the case above we check if the name of the table we created can be found in the database.