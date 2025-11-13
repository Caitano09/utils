import { incorporarDocumentos, incorporarPergunta } from "./embedding.js";
import { funcoes } from "./InicializaChat.js";

const documentos = await incorporarDocumentos(["A política de cancelamento é de 30 dias antes da viagem, caso contrário, não faremos o reembolso",
    "Viagem para a Disney, 6 dias, R$ 20.000,00 - Viagem para a Disney, 10 dias, R$ 25.000,00"
])

export async function executaChat(mensagem, chat) {
    console.log("Tamanho do histórico: " + (await chat.getHistory()).length);
    let doc = await incorporarPergunta(mensagem, documentos);
    const response = await chat.sendMessage({
        message: mensagem,
    });
    // return response.text;

    if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0]; // Assuming one function call
        console.log(`Function to call: ${functionCall.name}`);
        console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);

        const { name, args } = functionCall;
        const fn = funcoes[name];
        console.log('args', args)
        if (!fn) {
            throw new Error(`Unknown function "${name}"`);
        }

        const response2 = await chat.sendMessage({ message: "" + funcoes[name](args) });
        return response2.text;
        // In a real app, you would call your actual function here:
        // const result = await scheduleMeeting(functionCall.args);

    } else {
        console.log("No function call found in the response.");
        return response.text;
    }
}