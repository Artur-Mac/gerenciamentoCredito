// frontend/src/router.tsx
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';

// Importe as páginas que vamos criar
import HomePage from './pages/HomePage';
import CreditModalitiesListPage from './pages/CreditList';
import FinancingLinesListPage from './pages/FinancingLinesListPage';

// Layout simples para navegação
const RootLayout = () => {
  return (
    <div>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '10px' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/modalidades-credito">Modalidades de Crédito</Link></li>
          <li><Link to="/linhas-financiamento">Linhas de Financiamento</Link></li>
        </ul>
      </nav>
      <hr />
      <main>
        <Outlet /> {/* Onde o conteúdo da rota será renderizado */}
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Use o layout para todas as rotas
    children: [
      {
        index: true, // Rota padrão para '/'
        element: <HomePage />,
      },
      {
        path: 'modalidades-credito',
        element: <CreditModalitiesListPage />,
      },
      {
        path: 'linhas-financiamento',
        element: <FinancingLinesListPage />,
      },
    ],
  },
  {
    path: '*', // Rota "Não Encontrado" simples
    element: <div><h1>Página não encontrada</h1><Link to="/">Voltar para Home</Link></div>,
  }
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;