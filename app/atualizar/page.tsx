'use client';
import { atualizarCarro } from './actions';
import { useState } from 'react';
import Link from 'next/link';

import {
  inputStyle,
  buttonStyle,
  formStyle,
  labelStyle,
  containerStyle,
  linkStyle
} from '../../styles/sharedStyles';

export default function AtualizarCarroPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setStatus("Processando...");
    const resultado = await atualizarCarro(formData);
    setIsLoading(false);
    setStatus(resultado);
  }

  return (
    <div style={containerStyle}>
      <h2>ATUALIZAR CARRO</h2>
      <Link href="/" style={linkStyle}>← Voltar para a Home</Link>
      <br /><br />

      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
      >
        <label htmlFor="modeloUpdate" style={labelStyle}>Modelo do Carro:</label>
        <input type="text" name="modeloCarro" id="modeloUpdate" required style={inputStyle} />

        <label htmlFor="precoUpdate" style={labelStyle}>Novo Preço:</label>
        <input type="text" name="precoCarro" id="precoUpdate" required style={inputStyle} />

        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: '#ff9800' }}
          disabled={isLoading}
        >
          {isLoading ? 'ATUALIZANDO...' : 'ATUALIZAR CARRO'}
        </button>
      </form>

      {status && (
        <div style={{ marginTop: '20px' }}>
          <h3>Status da Operação:</h3>
          <div dangerouslySetInnerHTML={{ __html: status }} />
        </div>
      )}
    </div>
  );
}
