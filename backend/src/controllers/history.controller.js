import { getHistory } from "../memory/memory.service.js";


export async function historyController(req, res) {

    try {


        const userId =
    req.query.userId || "default-user";


        const history = await getHistory(userId);


        res.status(200).json(history);


    } catch(error) {


        console.error(error);


        res.status(500).json({

            error: "Erro ao buscar histórico"

        });


    }

}