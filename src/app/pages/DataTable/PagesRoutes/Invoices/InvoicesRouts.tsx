import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import InvoicesRotesPage from './components/InvoicesRotesPage';


export default function InvoicesRouts() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='invoices/*' element={<InvoicesRotesPage />} />
      </Route>
      <Route index element={<Navigate to='/invoices' />} />
    </Routes>
  );
}