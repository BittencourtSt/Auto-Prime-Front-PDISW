'use server';
import { revalidatePath } from 'next/cache';
import { CarroResponse } from '@/types/Carro';

const API_URL = "http://18.230.214.167:8080/deleteCarro";

export async function deletarCarro(formData: FormData): Promise<string> {
    const modelo = formData.get('ModeloCarro') as string;

    if (!modelo || modelo.trim().length === 0) {
        return "Por favor, informe o modelo do carro para deletar.";
    }

    // A API espera: apenas o modelo
    const corpo = modelo; 
    
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain; charset=UTF-8',
            },
            body: corpo, // Envia o modelo
        });

        const apiResponseText = await res.text();
        
        if (res.status === 200) {
            
            // Tenta extrair o JSON retornado pela API
            const mModelo = apiResponseText.match(/"modelo"\s*:\s*"([^"]+)"/);
            
            let resultado = `Carro com modelo '${modelo}' deletado com sucesso!<br>`;
            
            if (mModelo) {
                 // Se a API retornar o carro deletado
                 resultado += `Dados retornados pela API: ${apiResponseText}`;
            } else {
                 // Se for apenas uma mensagem de sucesso
                 resultado += apiResponseText.trim();
            }

            // Revalida a página de listagem
            revalidatePath('/listar'); 
            return resultado;

        } else {
            return `Erro ao deletar o carro. Código HTTP: ${res.status}<br>Resposta da API: ${apiResponseText}`;
        }

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Erro de conexão desconhecido";
        return `Erro de conexão: ${errorMessage}`;
    }
}