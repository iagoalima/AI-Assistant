const input = document.getElementById("inputMessage");
const button = document.getElementById("sendButton");
const clearButton = document.getElementById("clearButton");
const chat = document.getElementById("chat");

function addMessage(text, type) {

    const div = document.createElement("div");

    div.classList.add(
        "message",
        type
    );

    const content = document.createElement("div");
    content.textContent = text;
    const time = document.createElement("span");

    time.classList.add("time");

    time.textContent =
        new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    div.appendChild(content);
    div.appendChild(time);
    chat.appendChild(div);
    chat.scrollTop =
        chat.scrollHeight;

}
async function typeMessage(text, type) {

    const div = document.createElement("div");

    div.classList.add(
        "message",
        type
    );

    const content = document.createElement("div");

    div.appendChild(content);

    const time = document.createElement("span");

    time.classList.add("time");

    time.textContent =
        new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    div.appendChild(time);
    chat.appendChild(div);

    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        content.textContent += text[i]

        chat.scrollTop =
            chat.scrollHeight;

        await new Promise(resolve =>
            setTimeout(resolve, 40)
        );
    }
}

function showTyping() {

    const div = document.createElement("div");

    div.id = "typing";
    div.classList.add(
        "message",
        "assistant"
    );

    div.textContent =
        "AI Assistant está digitando...";

    chat.appendChild(div);

    chat.scrollTop =
        chat.scrollHeight;

}

function removeTyping() {

    const typing =
        document.getElementById("typing");
    if (typing) {
        typing.remove();
    }

}
async function sendMessage() {
    const message =
        input.value.trim();

    if (!message) return;

    addMessage(
        message,
        "user"
    );

    input.value = "";

    try {

        showTyping();
        const response = await fetch(
            "http://localhost:3000/api/history?userId=" + getUserId(),

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    message,
                    userId: getUserId()
})
            }
        );
        const data =
            await response.json();

        removeTyping();
        await typeMessage(
            data.response,
            "assistant"
        );

    } catch(error) {
        removeTyping();
        addMessage(
            "Erro ao conectar com o servidor.",
            "assistant"

        );
        console.error(error);
    }
}
async function loadHistory() {

    try {
        const response = await fetch(
            "http://localhost:3000/api/history"

        );
        const history =
            await response.json();

        chat.innerHTML = "";

        history.forEach(message => {
            addMessage(
                message.content,
                message.role === "user"
                    ? "user"
                    : "assistant"
            );
        });

    } catch(error) {
        console.error(
            "Erro ao carregar histórico:",
            error

        );
    }
}
button.addEventListener(
    "click",
    sendMessage

);
input.addEventListener(
    "keydown",

    (event)=>{
        if(event.key === "Enter") {
            sendMessage();

        }
    }
);
clearButton.addEventListener(
    "click",

    ()=>{

        chat.innerHTML = "";

    }
);

loadHistory();