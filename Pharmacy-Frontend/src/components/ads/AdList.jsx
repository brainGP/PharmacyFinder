import { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdDelete from './AdDelete';

export default function AdList() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      const { data } = await api.get('/ads');
      setAds(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-3">
      {ads.map((ad) => (
        <div key={ad._id} className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-800">{ad.title} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{ad.type}</span></p>
            <p className="text-sm text-gray-500">{ad.description}</p>
          </div>
          <AdDelete adId={ad._id} onDeleted={fetchAds} />
        </div>
      ))}
    </div>
  );
}
