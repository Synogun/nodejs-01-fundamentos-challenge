import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { search = "" } = req.query;

            const tasks = database.select("tasks", {
                title: search,
                description: search,
            });
            return res.end(JSON.stringify(tasks));
        },
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body

            if(!title) {
                return res.writeHead(400).end(JSON.stringify({msg: "Task must contain title!"}))
            }

            if (!description) {
                return res.writeHead(400).end(JSON.stringify({ msg: "Task must contain description!" }))
            }

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: Date(),
                updated_at: Date(),
            }
            database.insert("tasks", task);

            return res.writeHead(201).end();
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const currentData = database.get("tasks", id);
            
            if(Object.keys(currentData).length === 0){
                return res.writeHead(404).end(JSON.stringify({ msg: "Task id not found :(" }));
            }
            
            const { title=currentData.title, description=currentData.description } = req.body;
            // console.log(currentData);

            database.update("tasks", id, {
                title: title,
                description: description,
                updated_at: Date()
            });
            
            return res.writeHead(204).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const success = database.delete("tasks", id);

            if(!success) {
                return res.writeHead(404).end(JSON.stringify({ msg: "Task id not found :(" }));
            }

            return res.writeHead(204).end();
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;
            const currentData = database.get("tasks", id);

            if (Object.keys(currentData).length === 0) {
                return res.writeHead(404).end(JSON.stringify({ msg: "Task id not found :(" }));
            }

            database.update("tasks", id, {
                completed_at: Date()
            });

            return res.writeHead(204).end();
        }
    },
]