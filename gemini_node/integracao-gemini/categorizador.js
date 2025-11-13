import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';
import { promises as fs } from 'fs'

const { ai, model } = await inicializaModelo("gemini-robotics-er-1.5-preview")

export async function processaArquivoTexto() {
    const arquivo = await fazerPergunta('\n Me informe o caminho e o nome do arquivo: ')
    const dados = await fs.readFile(arquivo, 'utf-8')

    const prompt = `Analise as opiniões descritas em sequência e resuma os pontos positivos e negativos citados pelos clientes sobre esses destinos. Depois, categorize o percentual de respostas em satisfeito, insatisfeitos ou neutros, colocando no seguinte formato, por exemplo:  
       Satisfeitos: 20% - 20 respostas 
       Insatisfeitos: 50% - 50 respostas
       Neutros: 30% - 30 respostas 
       O total de respostas deve coincidir com o total de opiniões lidas. 
       Opiniões: ${dados}`;

    const response = await ai.models.generateContent({
        model,
        config: undefined,
        contents: prompt,
    });
    console.log(response.text)
}