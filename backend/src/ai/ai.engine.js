import { localResponse } from "./providers/local.provider.js";
import { personality } from "./personality.js";
import { getUser } from "../memory/user.memory.js";
import { detectIntent } from "../intents/intent.engine.js";


export async function processMessage(
    message,
    history,
    userId
) {


    const user = await getUser(userId);


    const intent = detectIntent(message);


    const context = {

        personality,

        history,

        user,

        intent

    };


    return await localResponse(
        message,
        context
    );

}