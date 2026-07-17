import { connectDatabase } from "../database/database.js";


let db;


async function getDB() {

    if (!db) {

        db = await connectDatabase();

    }

    return db;

}



export async function getHistory(userId) {

    const database = await getDB();


    return await database.all(
        `
        SELECT role, content
        FROM messages
        WHERE user_id = ?
        ORDER BY id ASC
        `,
        [userId]
    );

}



export async function addMessage(
    userId,
    role,
    content
) {

    const database = await getDB();


    await database.run(

        `
        INSERT INTO messages
        (
            user_id,
            role,
            content
        )

        VALUES (?, ?, ?)

        `,

        [
            userId,
            role,
            content
        ]

    );

}