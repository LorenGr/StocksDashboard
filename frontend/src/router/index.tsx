import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';
import('@/components/ProfileView');

const LazySymbolsView = lazy(() => import('@/components/SymbolsView'));
const LazProfileView = lazy(() => import('@/components/ProfileView'));
const LazyStatementsView = lazy(() => import('@/components/StatementsView'));

const Router = () => {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '50px', display: 'flex' }}>
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route index element={<LazySymbolsView />} />
        <Route index path="profile" element={<LazProfileView />} />
        <Route index path="statements" element={<LazyStatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
