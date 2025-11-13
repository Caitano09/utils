import { GoogleGenAI } from "@google/genai";
import { promises as fs } from "fs";

const ai = new GoogleGenAI(({ apiKey: '' }));

async function embedRetrievalQuery(queryText) {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: queryText,
    });
    return response.embeddings;
}

export async function incorporarDocumentos(docTexts) {
    const inlinedRequests = docTexts.map((t) => ({
        contents: [{ parts: [{ text: t }], role: 'user' }],
    }))

    let batchJob;
    batchJob = await ai.batches.createEmbeddings({
        model: 'gemini-embedding-001',
        // For a predefined a list of requests `inlinedRequests`
        src: { inlinedRequests: inlinedRequests },
        config: { displayName: 'Inlined embeddings batch' },
    });
    console.log(`Created batch job: ${batchJob.name}`);
    return batchJob.name
}

export async function leArquivos(arquivos) {
    try {
        const documentos = [];
        for (const filePath of arquivos) {
            const documento = await fs.readFile(filePath, 'utf-8');
            documentos.push(documento);
        }
        return documentos;
    } catch (error) {
        console.error('Erro ao ler os documentos', error);
        return [];
    }
}

function euclideanDistance(a, b) {
    let sum = 0;
    for (let n = 0; n < a.length; n++) {
        sum += Math.pow(a[n] - b[n], 2);
    }
    return Math.sqrt(sum);
}

export async function incorporarPergunta(queryText, docs) {
    const queryValues = await embedRetrievalQuery(queryText);
    console.log(queryText);

    let bestDoc = {}
    let minDistance = 1.0

    for (const doc of docs) {
        let distance = euclideanDistance(doc.values, queryValues)
        if (distance < minDistance) {
            minDistance = distance
            bestDoc = doc
        }
        console.log(
            "  ",
            distance,
            doc.text.substr(0, 40),
        );
    }
    return bestDoc
}