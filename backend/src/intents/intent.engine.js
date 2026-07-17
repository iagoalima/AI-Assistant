import { intents } from "./intents.js";


export function detectIntent(message) {


    const text = message.toLowerCase();


    for (const intent in intents) {


        const keywords = intents[intent];


        for (const keyword of keywords) {


            if(text.includes(keyword)) {

                return intent;

            }

        }

    }


    return "UNKNOWN";

}