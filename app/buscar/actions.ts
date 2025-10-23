'use server';
import { CarroResponse, Carro } from '@/types/Carro';

const API_URL = "http://18.231.156.122:8080/getCarro";

export async function findCarro(modeloCarro: string): Promise<CarroResponse> {
  if (!modeloCarro) {
    return { error: "Por favor, informe o modelo do carro para buscar." };
  }

  try {
    const conn = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain; charset=UTF-8',
        },
        body: modeloCarro,
    });

    if (!conn.ok) {
        return { error: `Erro na API: ${conn.status}` };
    }

    const json = await conn.text();

    // Regex para extrair modelo e preco
    const mModelo = json.match(/"modelo"\s*:\s*"([^"]+)"/);
    const mPreco = json.match(/"preco"\s*:\s*([\d\.]+)/);

    if (mModelo && mPreco) {
      const carroEncontrado: Carro = {
        modelo: mModelo[1],
        preco: parseFloat(mPreco[1]) 
      };
      return { carro: carroEncontrado };
    } else {
      return { error: "Nenhum carro encontrado ou resposta inesperada da API." };
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
    return { error: `Erro ao buscar o carro: ${errorMessage}` };
  }
}