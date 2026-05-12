import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductsHighlight from './pages/ProductsHighlight'
import ProductDetail from './pages/productDetail';
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/productshighlight" element={<ProductsHighlight/>}/>
        <Route path="/productdetail" element={<ProductDetail/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Dashboard/>} />
      </Routes>
    </>
  );
}
