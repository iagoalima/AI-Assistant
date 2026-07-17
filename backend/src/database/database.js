import sqlite3 from "sqlite3";
import { open } from "sqlite";


export async function connectDatabase() {

    const db = await open({

        filename: "./database.sqlite",

        driver: sqlite3.Database

    });


    await db.exec(`

        CREATE TABLE IF NOT EXISTS messages (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            user_id TEXT NOT NULL,

            role TEXT NOT NULL,

            content TEXT NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )

    `);

    await db.exec(`

    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id TEXT UNIQUE NOT NULL,

        name TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )

`);


    return db;

}