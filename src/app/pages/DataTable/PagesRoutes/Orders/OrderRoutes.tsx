import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import OrdersRoutsPage from './components/OrderRoutesPage';


export default function OrdersRouts() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='all/*' element={<OrdersRoutsPage />} />
      </Route>
      <Route index element={<Navigate to='/orders' />} />
    </Routes>
  );
}