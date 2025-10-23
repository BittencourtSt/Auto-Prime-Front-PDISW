import React from 'react';

const COLORS = {
    primary: '#0070f3', // Azul Claro
    secondary: '#f0f0f0', // Cinza Claro
    textDark: '#333',
    bgLight: '#ffffff',
    border: '#ddd',
};

export const containerStyle: React.CSSProperties = {
  maxWidth: '800px', 
  margin: '0 auto', 
  padding: '20px',
  backgroundColor: COLORS.bgLight,
};

export const linkStyle: React.CSSProperties = {
    color: COLORS.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '10px',
    transition: 'color 0.3s ease',
};

export const hrStyle: React.CSSProperties = {
  border: 'none',
  borderTop: `1px solid ${COLORS.border}`,
  margin: '2rem 0',
}

export const inputStyle: React.CSSProperties = {
  padding: '10px',
  margin: '8px 0 16px',
  border: `1px solid ${COLORS.border}`,
  borderRadius: '4px',
  width: 'calc(100% - 22px)',
  boxSizing: 'border-box'
};

export const labelStyle: React.CSSProperties = {
    display: 'block', 
    marginBottom: '8px', 
    fontWeight: 'bold',
    color: COLORS.textDark,
};

export const buttonStyle: React.CSSProperties = {
  backgroundColor: COLORS.primary,
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600',
  transition: 'background-color 0.3s ease',
  minWidth: '150px',
};

export const formStyle: React.CSSProperties = { 
    marginBottom: '20px', 
    padding: '15px', 
    border: `1px solid ${COLORS.secondary}`, 
    borderRadius: '6px',
    backgroundColor: COLORS.secondary,
};

export const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    borderRadius: '8px',
    overflow: 'hidden'
};

export const headerRowStyle: React.CSSProperties = {
    backgroundColor: COLORS.primary,
    color: 'white',
    textAlign: 'left'
};

export const rowEvenStyle: React.CSSProperties = {
    backgroundColor: COLORS.secondary,
};

export const rowOddStyle: React.CSSProperties = {
    backgroundColor: COLORS.bgLight,
};

export const cellStyle: React.CSSProperties = {
    padding: '12px 15px',
    borderBottom: `1px solid ${COLORS.border}`,
};