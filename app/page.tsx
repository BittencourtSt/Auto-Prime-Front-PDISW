import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>AUTO PRIME</h1>
      <hr style={hrStyle} />

      {/* Listar Carros */}
      <h3>LISTAR CARROS</h3>
      <div style={sectionStyle}>
        <Link href="/listar">
          <button style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}>LISTAR CARROS</button>
        </Link>
      </div>

      <hr style={hrStyle} />

      {/* Buscar Carros */}
      <h3>PROCURAR CARROS</h3>
      <form action="/buscar" method="GET" style={formStyle}>
        <label htmlFor="ModeloCarro" style={labelStyle}>Modelo Carro:</label>
        <input type="text" name="ModeloCarro" id="ModeloCarro" required style={inputStyle} />
        <button type="submit" style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}>PESQUISAR CARRO</button>
      </form>

      <hr style={hrStyle} />

      {/* Salvar Carro */}
      <h3>SALVAR CARRO</h3>
      <div style={sectionStyle}>
        <Link href="/salvar">
          <button style={buttonStyle}>SALVAR NOVO</button>
        </Link>
      </div>

      <hr style={hrStyle} />

      {/* Atualizar Carro */}
      <h3>ATUALIZAR CARRO</h3>
      <div style={sectionStyle}>
        <Link href="/atualizar">
          <button style={{ ...buttonStyle, backgroundColor: '#ff9800' }}>ATUALIZAR EXISTENTE</button>
        </Link>
      </div>

      <hr style={hrStyle} />

      {/* Deletar Carro */}
      <h3>DELETAR CARRO</h3>
      <div style={sectionStyle}>
        <Link href="/deletar">
          <button style={{ ...buttonStyle, backgroundColor: '#f44336' }}>DELETAR EXISTENTE</button>
        </Link>
      </div>

      <hr style={hrStyle} />
    </div>
  );
}

// Estilos
const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px'
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px'
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  margin: '8px 0 16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: 'calc(100% - 22px)',
  boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0070f3',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600',
  transition: 'background-color 0.3s ease',
  minWidth: '150px'
};

const formStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  border: '1px solid #f0f0f0',
  borderRadius: '6px',
  backgroundColor: '#f0f0f0'
};

const hrStyle: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #ddd',
  margin: '2rem 0'
};
