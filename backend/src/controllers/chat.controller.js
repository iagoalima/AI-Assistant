import { processMessage } from "../ai/ai.engine.js";
import { 
    getHistory,
    addMessage
} from "../memory/memory.service.js";

import {
    saveUserName
} from "../memory/user.memory.js";


export async function chatController(req, res) {

    try {

        const message = req.body?.message;


        if (!message) {

            return res.status(400).json({
                error: "Mensagem não enviada"
            });

        }


        const userId =
    req.body.userId || "default-user";


        const lowerMessage = message.toLowerCase();


        // Detecta e salva nome do usuário
        if (lowerMessage.includes("meu nome é")) {

            const name = message
                .split("é")[1]
                .trim();


            await saveUserName(
                userId,
                name
            );

        }


        // Salva mensagem do usuário
        await addMessage(
            userId,
            "user",
            message
        );


        // Busca histórico atualizado
        const history = await getHistory(userId);


        // Processa resposta da IA
        const response = await processMessage(
            message,
            history,
            userId
        );


        // Salva resposta da IA
        await addMessage(
            userId,
            "assistant",
            response
        );


        // Busca histórico completo atualizado
        const updatedHistory = await getHistory(userId);


        res.status(200).json({

            response,

            history: updatedHistory

        });


    } catch(error) {

        console.error(error);


        res.status(500).json({

            error: "Erro interno no servidor"

        });

    }

}