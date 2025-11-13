import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';

const { ai, model } = await inicializaModelo("gemini-robotics-er-1.5-preview")

export async function perguntar() {
    const config = {
        systemInstruction: [
            {
                text: `Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida. Para formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas no momento da pergunta. Alguns exemplos de categorias: características, localização, cultura, pontos turísticos,  culinária, clima, dicas, como chegar, curiosidades.`,
            }
        ],
    };
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: await fazerPergunta("Me faça uma pergunta livre sobre o destino que você quer conhecer: "),
                },
            ],
        },
    ];
    const countTokensResponse = await ai.models.countTokens({
        model: model,
        contents: contents,
    });
    console.log("countTokensResponse:", countTokensResponse.totalTokens);

    const generateResponse = await ai.models.generateContent({
        model: model,
        contents: contents,
    });
    console.log("generateResponse:", generateResponse.usageMetadata);
    console.log("generateResponse:", generateResponse.text);
}
