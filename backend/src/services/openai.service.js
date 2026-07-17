import OpenAI from "openai";


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export async function generateResponse(message) {

    const completion = await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
            {
                role: "system",
                content: "Você é um assistente inteligente e útil."
            },
            {
                role: "user",
                content: message
            }
        ]

    });


    return completion.choices[0].message.content;

}