import { useEffect, useState } from 'react';
import api from '../../api/axios';
import PharmacyDelete from './PharmacyDelete';

export default function PharmacyList() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPharmacies = async () => {
    try {
      const { data } = await api.get('/pharmacies');
      setPharmacies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-3">
      {pharmacies.map((p) => (
        <div key={p._id} className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-800">{p.name} {p.branch && `· ${p.branch}`}</p>
            <p className="text-sm text-gray-500">{p.address} · {p.isOpen ? '🟢 Open' : '🔴 Closed'}</p>
          </div>
          <PharmacyDelete pharmacyId={p._id} onDeleted={fetchPharmacies} />
        </div>
      ))}
    </div>
  );
}
