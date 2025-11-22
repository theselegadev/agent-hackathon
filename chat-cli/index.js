import OpenAI from "openai";
import readlineSync from "readline-sync";
import axios from "axios";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const API_BASE = "http://localhost:8080";

// -------------------------------------------
// TOOLS: Implementação real da sua API
// -------------------------------------------

// 1. Criar usuário
async function createUser({ id = 1, name, password, nameBusiness, activity, description }) {
    const response = await axios.post(`${API_BASE}/user`, {
        id,
        name,
        password,
        nameBusiness,
        activity,
        description
    });

    return response.data;
}

// 2. Login
async function loginUser({ email, password }) {
    const response = await axios.post(`${API_BASE}/login`, {
        email,
        password
    });

    return response.data; // idealmente retorna token
}

// 3. Buscar vendas por mês
async function getSalesByMonth({ month, idBusiness, token }) {
    const response = await axios.get(
        `${API_BASE}/sale/${month}/${idBusiness}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

// -------------------------------------------
// DEFINIÇÃO DAS TOOLS (OpenAI)
// -------------------------------------------

const tools = [
    {
        type: "function",
        function: {
            name: "createUser",
            description: "Cria um usuário no sistema",
            parameters: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    password: { type: "string" },
                    nameBusiness: { type: "string" },
                    activity: { type: "string" },
                    description: { type: "string" }

                },
                required: ["name", "email", "password"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "loginUser",
            description: "Realiza login do usuário",
            parameters: {
                type: "object",
                properties: {
                    email: { type: "string" },
                    password: { type: "string" }
                },
                required: ["email", "password"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "getSalesByMonth",
            description: "Obtém vendas por mês de um negócio",
            parameters: {
                type: "object",
                properties: {
                    month: { type: "string" },
                    idBusiness: { type: "string" },
                    token: { type: "string" }
                },
                required: ["month", "idBusiness", "token"]
            }
        }
    }
];

// -------------------------------------------
// LOOP DO CHAT
// -------------------------------------------

async function main() {
    console.log("Agente GPT-4.1-mini com acesso à sua API. Digite algo:");

    const messages = [];

    while (true) {
        const input = readlineSync.question("> ");

        if (input === "/exit") process.exit(0);
        if (input === "/reset") {
            messages.length = 0;
            console.log("Memória limpa.\n");
            continue;
        }

        messages.push({ role: "user", content: input });

        // PRIMEIRA CHAMADA — modelo decide se usa tool
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages,
            tools,
            tool_choice: "auto"
        });

        console.log("Log: ", JSON.stringify(response));

        const msg = response.choices[0].message;

        // ------------------------------------------------
        // AQUI: se o modelo decidir usar tool
        // ------------------------------------------------
        if (msg.tool_calls?.length > 0) {
            const call = msg.tool_calls[0];
            const args = JSON.parse(call.function.arguments);

            let result;

            try {
                if (call.function.name === "createUser") {
                    result = await createUser(args);
                }

                if (call.function.name === "loginUser") {
                    result = await loginUser(args);
                }

                if (call.function.name === "getSalesByMonth") {
                    result = await getSalesByMonth(args);
                }
            } catch (err) {
                result = { error: true, details: err.response?.data || err.message };
            }

            // SEGUNDA CHAMADA — envia resultado da tool para o GPT responder
            const finalResponse = await client.chat.completions.create({
                model: "gpt-4.1-mini",
                messages: [
                    ...messages,
                    msg,
                    {
                        role: "tool",
                        tool_call_id: call.id,
                        content: JSON.stringify(result)
                    }
                ]
            });

            const output = finalResponse.choices[0].message.content;
            console.log("\nAssistente:", output, "\n");

            messages.push({ role: "assistant", content: output });
            continue;
        }

        // ------------------------------------------------
        // SEM TOOL → resposta direta
        // ------------------------------------------------
        console.log("\nAssistente:", msg.content, "\n");
        messages.push({ role: "assistant", content: msg.content });
    }
}

main();
