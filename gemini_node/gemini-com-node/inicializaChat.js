import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: '' });

const funcoes = {
    taxaJurosParcelamento: ({ value }) => {
        const meses = typeof value === "string" ? parseInt(value) : value;
        console.log(meses)
        if (meses <= 6) {
            return 3;
        } else if (meses <= 12) {
            return 5;
        } else if (meses <= 24) {
            return 7;
        }
        else {
            return 1
        }
    }
};

function inicializaChat() {
    const taxaJurosParcelamentoFunctionDeclaration = {
        name: 'taxaJurosParcelamento',
        description: "Retorna a taxa de juros para parcelamento baseado na quantidade de meses.O argumento necessário é a quantidade de meses. Exemplo: 10 vezes",
        parameters: {
            type: Type.OBJECT,
            properties: {
                value: { type: Type.NUMBER },
            },
            required: ["value"],
        },
    };

    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
            {
                role: "user",
                parts: [{ text: "Você é Jordi, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenham relação com viagens." }],
            },
            {
                role: "model",
                parts: [{ text: "Olá! Obrigado por entrar em contato com o Jornada Viagens. Antes de começar a responder sobre suas dúvidas, preciso do seu nome e endereço de e-mail." }],
            },
        ],
        config: {
            tools: [{
                functionDeclarations: [taxaJurosParcelamentoFunctionDeclaration]
            }],
        },
    });
    return chat
}

export { inicializaChat, funcoes }