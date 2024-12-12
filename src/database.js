import fs from "node:fs/promises";

const dbPath = new URL("../db.json", import.meta.url);

export class Database {
    #database = {}

    constructor() {
        fs.readFile(dbPath, "utf8")
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                // this.#debugFunc();
                this.#persist();
            });
    }

    #persist() {
        fs.writeFile(dbPath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? [];
        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                });
            });
        }
        return data;
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist()
        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            for(var prop in data) {
                this.#database[table][rowIndex][prop] = data[prop];
            }
            
            // this.#database[table][rowIndex] = {id, ...data};
            this.#persist();
            return true;
        }
        return false;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
            return true;
        }
        return false;
    }

    get(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            return this.#database[table][rowIndex];
        }

        return {}
    }

    // #debugFunc() { 
    //     const task = {
    //         id: "012345678-abcd-9012-efgh-3456789ijklm",
    //         title: "debug task",
    //         description: "this task its only for debug purposes",
    //         completed_at: null,
    //         created_at: Date(),
    //         updated_at: Date(),
    //     }
    //     this.insert("tasks", task);
    // }
}