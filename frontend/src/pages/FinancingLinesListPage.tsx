// frontend/src/pages/FinancingLinesListPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFinancingLines } from '../api'; // Ajuste o caminho se necessário
import type { FinancingLine } from '../api'; // Ajuste o caminho se necessário

const FinancingLinesListPage: React.FC = () => {
  const { data: financingLines, isLoading, error } = useQuery<FinancingLine[], Error>({
    queryKey: ['financingLines'],
    queryFn: fetchFinancingLines,
  });

  if (isLoading) return <p>Carregando linhas de financiamento...</p>;
  if (error) return <p>Erro ao carregar linhas: {error.message}</p>;

  return (
    <div>
      <h2>Linhas de Financiamento Disponíveis</h2>
      {financingLines && financingLines.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {financingLines.map((line) => (
            <li key={line.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{line.name}</h3>
              <p><strong>ID:</strong> {line.id}</p>
              <p><strong>Tipo de Imóvel:</strong> {line.propertyType}</p>
              <p><strong>Modalidades Não Permitidas (Tipos):</strong> {line.disallowedModalityTypes.join(', ') || 'Nenhuma'}</p>
              <p><strong>Descrição:</strong> {line.description ?? 'Sem descrição'}</p>
              <p><strong>Ativa:</strong> {line.isActive ? 'Sim' : 'Não'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma linha de financiamento encontrada.</p>
      )}
    </div>
  );
};

export default FinancingLinesListPage;