// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router.tsx'; // Renomeado de AppRoutes para AppRouter
import './index.css'; // <<-- IMPORTAÇÃO CORRETA DO CSS GLOBAL
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);