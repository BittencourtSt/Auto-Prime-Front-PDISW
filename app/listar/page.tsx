import { Carro } from '@/types/Carro'; 
import Link from 'next/link'; 

import { 
    tableStyle, 
    headerRowStyle, 
    rowEvenStyle, 
    rowOddStyle, 
    containerStyle,
    linkStyle,
    cellStyle 
} from '../../styles/sharedStyles';

const API_URL = "http://18.230.214.167:8080/listarCarros";

// Função para buscar os dados no servidor
async function getCarros(): Promise<Carro[] | null> {
  try {
    // cache: 'no-store' garante que a requisição seja feita a cada acesso.
    const res = await fetch(API_URL, { method: 'GET', cache: 'no-store' }); 
    
    if (!res.ok) {
        throw new Error(`Falha ao buscar dados: ${res.status}`);
    }

    const text = await res.text();
    
    // Regex para extrair modelo e preco do texto
    const pattern = /\{"id":\d+,"modelo":"([^"]+)","preco":([\d\.E]+)\}/g;
    let match: RegExpExecArray | null;
    const carros: Carro[] = [];

    while ((match = pattern.exec(text)) !== null) {
      carros.push({ 
        modelo: match[1], 
        preco: parseFloat(match[2]) 
      });
    }
    
    return carros;

  } catch (error) {
    console.error("Erro ao buscar carros:", error);
    return null;
  }
}

// O componente de página é assíncrono para aguardar a busca de dados
export default async function ListarCarrosPage() {
  const carros = await getCarros();
  
  return (
    <div style={containerStyle}>
      <h2>LISTA DE CARROS</h2>
      <Link href="/" style={linkStyle}>Voltar</Link>
      <br/><br/>
      
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            {/* Aplicamos cellStyle (padding e borda) nos TH */}
            <th style={cellStyle}>Modelo</th>
            <th style={cellStyle}>Preço</th>
          </tr>
        </thead>
        <tbody>
          {carros && carros.length > 0 ? (
            carros.map((carro, index) => (
              // Aplicamos as cores de fundo (cinza e branco) nas linhas
              <tr key={index} style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                {/* Aplicamos cellStyle (padding e borda) nos TD */}
                <td style={cellStyle}>{carro.modelo}</td>
                <td style={cellStyle}>{carro.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center', padding: '15px' }}>
                {carros === null ? "Erro ao carregar os dados da API." : "Nenhum carro encontrado."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}