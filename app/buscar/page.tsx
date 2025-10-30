'use client'; 
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { findCarro } from './actions';
import { CarroResponse } from '@/types/Carro';
import { getCarImagePath } from '../utils/carImageMap'; 

import { 
    tableStyle, 
    headerRowStyle, 
    rowEvenStyle, 
    linkStyle, 
    containerStyle,
    cellStyle 
} from '../../styles/sharedStyles';

export default function BuscarCarroPage() {
  const searchParams = useSearchParams();
  const modelo = searchParams.get('ModeloCarro');

  const [resultado, setResultado] = useState<CarroResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modelo) {
      setLoading(true);
      findCarro(modelo).then(res => {
        setResultado(res);
        setLoading(false);
      });
    }
  }, [modelo]);

  return (
    <div style={containerStyle}>
      <h2>RESULTADO DA BUSCA</h2>
      <Link href="/" style={linkStyle}>Voltar para a Home</Link>
      <br/><br/>

      {!modelo && <p>Por favor, utilize o formulário na <Link href="/" style={linkStyle}>página inicial</Link> para informar o modelo do carro.</p>}
      
      {loading && modelo && <p>Buscando carro com modelo "{modelo}"...</p>}
      
      {resultado && resultado.error && <p style={{ color: 'red', fontWeight: 'bold' }}>Erro: {resultado.error}</p>}
      
      {resultado && resultado.carro && (
        <>
          <h3>CARRO ENCONTRADO</h3>
            
            {/* Bloco para exibir a imagem */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Image 
                    src={getCarImagePath(resultado.carro.modelo)} 
                    alt={`Imagem do carro ${resultado.carro.modelo}`}
                    width={350} 
                    height={200} 
                    priority={true}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
            </div>

            {/* CORREÇÃO FINAL: TODA a estrutura da tabela está em linhas contíguas para garantir que não haja whitespace nodes. */}
          <table style={tableStyle}>
                <thead><tr style={headerRowStyle}><th style={cellStyle}>Modelo</th><th style={cellStyle}>Preço</th></tr></thead>
                <tbody><tr style={rowEvenStyle}><td style={cellStyle}>{resultado.carro.modelo}</td><td style={cellStyle}>{resultado.carro.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td></tr></tbody>
            </table>
        </>
      )}
    </div>
  );
}
