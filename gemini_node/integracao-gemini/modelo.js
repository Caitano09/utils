import { GoogleGenAI } from '@google/genai';

export async function inicializaModelo(modelo) {
    const ai = new GoogleGenAI({ apiKey: '' });
    const model = modelo;
    return { ai, model }
}