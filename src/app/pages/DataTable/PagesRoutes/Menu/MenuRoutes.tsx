import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import CategoriesRoutsPage from './components/categoriesRouts'
import FoodItemsRoutsPage from './components/foodItemsRouts'


const MenuRoutes = () => {
  return (
    <Routes>
      {/* categories */}
      <Route element={<Outlet />}>
        <Route path='categories/*' element={<CategoriesRoutsPage />} />
        <Route path='foodItems/*' element={<FoodItemsRoutsPage />} />
      </Route>
      <Route index element={<Navigate to='/menu/categories' />} />
    </Routes>
  )
}

export default MenuRoutes
