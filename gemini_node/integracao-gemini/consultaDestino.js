import mime from 'mime';
import { writeFile } from 'fs';
import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';

function saveBinaryFile(fileName, content) {
    writeFile(fileName, content, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file ${fileName}:`, err);
            return;
        }
        console.log(`File ${fileName} saved to file system.`);
    });
}
const { ai, model } = await inicializaModelo("gemini-2.0-flash")

export async function consultar() {
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
                    text: await fazerPergunta("Me fale as categorias que deseja visualizar sobre determinado destino: "),
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: await fazerPergunta("Me fale sobre o destino que você quer conhecer: "),
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let fileIndex = 0;
    for await (const chunk of response) {
        if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
            continue;
        }
        if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
            const inlineData = chunk.candidates[0].content.parts[0].inlineData;
            const fileExtension = mime.getExtension(inlineData.mimeType || '');
            const buffer = Buffer.from(inlineData.data || '', 'base64');
            saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
        }
        else {
            console.log(chunk.text);
        }
    }
}
