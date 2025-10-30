'use server';
import { revalidatePath } from 'next/cache';

const API_URL = "http://18.230.214.167:8080/saveCarro";

export async function salvarCarro(formData: FormData): Promise<string> {
    const modelo = formData.get('modeloCarro') as string;
    const preco = formData.get('precoCarro') as string;

    if (!modelo || !preco) {
        return "Por favor, informe modelo e preço do carro.";
    }

    // A API espera: "modelo,preco"
    const corpo = `${modelo},${preco}`; 
    
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain; charset=UTF-8',
            },
            body: corpo, 
        });

        const responseCode = res.status;
        const apiResponseText = await res.text();
        
        let resultado = "";
        
        if (responseCode === 200) {
            resultado += `Carro '${modelo}' salvo com sucesso!<br>`;
            resultado += `Resposta da API: ${apiResponseText}`;

            // Revalida a página de listagem para mostrar o carro novo
            revalidatePath('/listar'); 
        } else {
            resultado += `Erro ao salvar o carro. Código HTTP: ${responseCode}<br>`;
            resultado += `Resposta da API: ${apiResponseText}`;
        }

        return resultado;

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Erro de conexão desconhecido";
        return `Erro de conexão: ${errorMessage}`;
    }
}