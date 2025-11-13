import { inicializaModelo } from './modelo.js';

import {
    createUserContent,
    createPartFromUri,
} from "@google/genai";

export async function processaImagem(img) {
    const { ai, model } = await inicializaModelo("gemini-2.0-flash")

    const image = await ai.files.upload({
        file: img,
    });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            createUserContent([
                "Me fale tudo que puder sobre o destino mostrado nessa imagem: ",
                createPartFromUri(image.uri, image.mimeType),
            ]),
        ],
    });
    console.log(response.text);
}