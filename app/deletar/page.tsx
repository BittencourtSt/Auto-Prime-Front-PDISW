'use client';
import { deletarCarro } from './actions';
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

export default function DeletarCarroPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setStatus("Processando...");
    const resultado = await deletarCarro(formData);
    setIsLoading(false);
    setStatus(resultado);
  }

  return (
    <div style={containerStyle}>
      <h2>DELETAR CARRO</h2>
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
        <label htmlFor="modeloDeletar" style={labelStyle}>Modelo do Carro:</label>
        <input type="text" name="ModeloCarro" id="modeloDeletar" required style={inputStyle} />

        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: '#f44336' }}
          disabled={isLoading}
        >
          {isLoading ? 'DELETANDO...' : 'DELETAR CARRO'}
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
