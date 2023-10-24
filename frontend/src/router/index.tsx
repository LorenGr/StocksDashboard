import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';
import('@/components/ProfileView');

const LazySymbolsView = lazy(() => import('@/components/SymbolsView'));
const LazProfileView = lazy(() => import('@/components/ProfileView'));

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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
