import "dotenv/config";

import app from "./app.js";


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.clear();

    console.log("======================================");
    console.log("🚀 AI Assistant Backend");
    console.log("======================================");
    console.log(`Servidor iniciado em:`);
    console.log(`http://localhost:${PORT}`);
    console.log("======================================");

});