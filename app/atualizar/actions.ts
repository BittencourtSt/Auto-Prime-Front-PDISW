'use server';
import { revalidatePath } from 'next/cache';

const API_URL = "http://18.231.156.122:8080/updateCarro";

export async function atualizarCarro(formData: FormData): Promise<string> {
    const modelo = formData.get('modeloCarro') as string;
    const preco = formData.get('precoCarro') as string;

    if (!modelo || !preco) {
        return "Por favor, informe modelo e preço do carro para atualizar.";
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

        const apiResponseText = await res.text();
        
        let resultado = "";
        
        if (res.status === 200) {
            resultado += `Carro '${modelo}' atualizado com sucesso!<br>`;
            resultado += `Resposta da API: ${apiResponseText}`;

            // Revalida a página de listagem
            revalidatePath('/listar'); 
        } else {
            resultado += `Erro ao atualizar o carro. Código HTTP: ${res.status}<br>`;
            resultado += `Resposta da API: ${apiResponseText}`;
        }

        return resultado;

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Erro de conexão desconhecido";
        return `Erro de conexão: ${errorMessage}`;
    }
}