import { connectDatabase } from "../database/database.js";


let db;


async function getDB() {

    if (!db) {

        db = await connectDatabase();

    }

    return db;

}



export async function saveUserName(
    userId,
    name
) {

    const database = await getDB();


    await database.run(

        `
        INSERT INTO users
        (
            user_id,
            name
        )

        VALUES (?, ?)

        ON CONFLICT(user_id)
        DO UPDATE SET name = ?

        `,

        [
            userId,
            name,
            name
        ]

    );

}



export async function getUser(
    userId
) {

    const database = await getDB();


    return await database.get(

        `
        SELECT *
        FROM users
        WHERE user_id = ?

        `,

        [
            userId
        ]

    );

}