import { useEffect, useState } from 'react';
import api from '../../api/axios';
import DiscountDelete from './DiscountDelete';

export default function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDiscounts = async () => {
    try {
      const { data } = await api.get('/discounts');
      setDiscounts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-3">
      {discounts.map((d) => (
        <div key={d._id} className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-800">{d.productId?.name} <span className="text-green-600 font-semibold">-{d.percentage}%</span></p>
            <p className="text-sm text-gray-500">{d.pharmacyId?.name}</p>
          </div>
          <DiscountDelete discountId={d._id} onDeleted={fetchDiscounts} />
        </div>
      ))}
    </div>
  );
}
