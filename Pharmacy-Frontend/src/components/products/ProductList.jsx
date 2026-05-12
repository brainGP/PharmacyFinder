import { useEffect, useState } from 'react';
import api from '../../api/axios';
import ProductDelete from './ProductDelete';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div key={p._id} className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-800">{p.name} <span className="text-gray-400 font-normal">· {p.brand}</span></p>
            <p className="text-sm text-gray-500">₮{p.price.toLocaleString()} · {p.category} · {p.status}</p>
          </div>
          <ProductDelete productId={p._id} onDeleted={fetchProducts} />
        </div>
      ))}
    </div>
  );
}
