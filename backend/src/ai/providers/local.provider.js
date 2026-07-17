export async function localResponse(message, context) {


    const history = context.history;

    const personality = context.personality;

    const user = context.user;

    const intent = context.intent;


    // ============================
    // SALVAR NOME
    // ============================

    if (intent === "SAVE_NAME") {


        const name = message
            .split("é")[1]
            .trim();


        const formattedName =
            name.charAt(0).toUpperCase() +
            name.slice(1);


        return `Prazer em conhecer você, ${formattedName}. Vou lembrar do seu nome.`;

    }



    // ============================
    // CONSULTAR NOME
    // ============================

    if (intent === "USER_NAME") {


        if (user?.name) {

            return `Seu nome é ${user.name}.`;

        }


        return "Ainda não sei seu nome.";

    }



    // ============================
    // SAUDAÇÃO
    // ============================

    if (intent === "GREETING") {


        if (user?.name) {

            return `Olá, ${user.name}! Como posso ajudar?`;

        }


        return "Olá! Sou o AI Assistant. Como posso ajudar?";

    }



    // ============================
    // IDENTIDADE
    // ============================

    if (intent === "ABOUT") {


        return `Eu sou o ${personality.name}. ${personality.description}`;

    }



    // ============================
    // RESPOSTA PADRÃO
    // ============================

    return `Você disse: "${message}". Estou aprendendo com nossas conversas.`;

}