'use client'; 
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { findCarro } from './actions';
import { CarroResponse } from '@/types/Carro';
import Link from 'next/link';

// Componente com os estilos da tabela
import { tableStyle, headerRowStyle, rowEvenStyle, rowOddStyle, linkStyle, containerStyle } from '../../styles/sharedStyles';

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

      {!modelo && <p>Por favor, utilize o formulário na <Link href="/">página inicial</Link> para informar o modelo do carro.</p>}
      
      {loading && modelo && <p>Buscando carro com modelo "{modelo}"...</p>}
      
      {resultado && resultado.error && <p style={{ color: 'red', fontWeight: 'bold' }}>Erro: {resultado.error}</p>}
      
      {resultado && resultado.carro && (
        <>
          <h3>CARRO ENCONTRADO</h3>
          <table style={tableStyle}>
            <thead>
              <tr style={headerRowStyle}>
                <th>Modelo</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr style={rowEvenStyle}>
                <td>{resultado.carro.modelo}</td>
                <td>{resultado.carro.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}