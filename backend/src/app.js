import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat.routes.js";


const app = express();


app.use(cors());


app.use(express.json());


app.use("/api", chatRoutes);



app.get("/", (req, res) => {

    res.json({

        status:"online",

        message:"AI Assistant Backend funcionando!"

    });

});


export default app;