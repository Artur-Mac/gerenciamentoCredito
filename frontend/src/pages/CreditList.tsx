import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCreditModalities } from '../api'; // Ajuste o caminho se necessário
import type { CreditModality } from '../api';

const CreditModalitiesListPage: React.FC = () => {
  const {
    data: modalities,
    isLoading,
    error,
    isError, // Adiciona isError para uma verificação mais explícita
  } = useQuery<CreditModality[], Error>({ // Especifica o tipo de erro também
    queryKey: ['creditModalities'],
    queryFn: fetchCreditModalities,
    // staleTime: 1000 * 60 * 5, // Opcional: 5 minutos de stale time
    // refetchOnWindowFocus: false, // Opcional: desabilitar refetch ao focar na janela
  });

  // Logs para depuração
  console.log('[CreditModalitiesListPage] isLoading:', isLoading);
  console.log('[CreditModalitiesListPage] error:', error);
  console.log('[CreditModalitiesListPage] isError:', isError);
  console.log('[CreditModalitiesListPage] modalities data:', modalities);

  if (isLoading) {
    return <p>Carregando modalidades de crédito...</p>;
  }

  if (isError && error) { // Verifica se 'error' não é null antes de acessar 'message'
    return <p>Erro ao carregar modalidades: {error.message}</p>;
  }

  // Verificação crucial antes de tentar usar .map()
  // Se isLoading é false e não há erro, 'modalities' deveria ser um array (mesmo que vazio)
  // ou undefined se a queryFn retornou undefined (o que não deveria acontecer com a nossa fetchCreditModalities)
  if (!modalities || !Array.isArray(modalities)) {
    // Este estado pode acontecer brevemente ou se a API retornar algo inesperado que passou pela verificação no serviço
    console.warn("[CreditModalitiesListPage] Modalities data is not an array or is undefined after loading.", modalities);
    return <p>Nenhuma modalidade de crédito para exibir ou dados em formato inesperado.</p>;
  }

  return (
    <div>
      <h2>Modalidades de Crédito Disponíveis</h2>
      {modalities.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {modalities.map((modality: CreditModality) => (
            <li key={modality.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{modality.name}</h3>
              <p><strong>ID:</strong> {modality.id}</p>
              <p><strong>Tipo de Juros:</strong> {modality.interestType ?? 'N/A'}</p>
              <p>
                <strong>Taxa:</strong>{' '}
                {modality.interestRate !== null && modality.interestRate !== undefined
                  ? `${modality.interestRate}%`
                  : modality.adminFeePercentage !== null && modality.adminFeePercentage !== undefined
                  ? `Taxa Adm: ${modality.adminFeePercentage}%`
                  : 'N/A'}
              </p>
              <p><strong>Prazo Máximo:</strong> {modality.maxTermYears} anos</p>
              <p>
                <strong>Idade:</strong> {modality.minAge ?? 'N/A'} - {modality.maxAge ?? 'N/A'} anos
              </p>
              <p>
                <strong>Renda:</strong> R$ {modality.minIncome ?? 'N/A'} - R$ {modality.maxIncome ?? 'N/A'}
              </p>
              <p><strong>Descrição:</strong> {modality.description ?? 'Sem descrição'}</p>
              <p><strong>Ativa:</strong> {modality.isActive ? 'Sim' : 'Não'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma modalidade de crédito encontrada.</p>
      )}
    </div>
  );
};

export default CreditModalitiesListPage;