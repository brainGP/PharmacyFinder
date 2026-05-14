import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import useTitle from '../hooks/useTitle.js';
import api from '../api/axios.js';
import PharmacyCard from '../components/PharmacyCard.jsx';
import Filter from '../components/Filter.jsx';
import useStore from '../store/useStore.js';
import { Store, MapPin, LayoutGrid, Map as MapIcon, Search } from 'lucide-react';

const Map = lazy(() => import('../components/Map.jsx'));
const PAGE_SIZE = 500;

export default function Pharmacies() {
  useTitle('Эмийн сангууд');
  const [pharmacies, setPharmacies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const { userLocation, setUserLocation, getCacheEntryStale, setCacheEntry } = useStore();

  const fetchPharmacies = useCallback(async () => {
    const cacheKey = `pharmacies-${JSON.stringify(filters)}-${userLocation?.lat ?? ''}-${userLocation?.lng ?? ''}`;
    const stale = getCacheEntryStale(cacheKey);
    
    if (stale) {
      setPharmacies(stale.pharmacies);
      setTotal(stale.total);
      setLoading(false);
    } else {
      setLoading(true);
    }
    
    try {
      const { maxDistance, ...otherFilters } = filters;
      const params = { limit: PAGE_SIZE, ...otherFilters };
      
      if (userLocation) {
        params.lat = userLocation.lat;
        params.lng = userLocation.lng;
      }
  
      if (maxDistance && parseInt(maxDistance) < 20000) {
        params.maxDistance = maxDistance;
      }
      
      const { data } = await api.get('/pharmacies', { params });
      setPharmacies(data.pharmacies);
      setTotal(data.total);
      setCacheEntry(cacheKey, { pharmacies: data.pharmacies, total: data.total });
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, [filters, userLocation]);

  useEffect(() => {
    fetchPharmacies();
  }, [fetchPharmacies]);

  const handleFilterChange = (f) => {
    setFilters(f);
  };

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
      () => alert('Байршил авах боломжгүй.')
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Store size={22} className="text-primary-600" /> Эмийн сангууд
        </h1>
        <div className="flex items-center gap-2">
          {!userLocation && (
            <button
              onClick={handleLocate}
              className="btn-secondary text-sm flex items-center gap-1.5"
            >
              <MapPin size={14} /> Байршил оруулах
            </button>
          )}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 transition-colors flex items-center ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 transition-colors flex items-center ${viewMode === 'map' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <MapIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-64 flex-shrink-0 lg:self-start lg:sticky lg:top-24">
          <Filter
            filters={filters}
            onChange={handleFilterChange}
            options={{ showOpenFilter: true, showDistance: true, suggestionType: 'pharmacies' }}
          />
        </aside>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-gray-700">{total}</span> эмийн сан олдлоо
            {userLocation && (
              <span className="ml-1 text-primary-600">· Байршлаараа эрэмбэлэгдсэн</span>
            )}
          </p>

          {viewMode === 'map' ? (
            <Suspense fallback={<div className="h-[500px] bg-gray-100 rounded-xl animate-pulse" />}>
              <Map
                userLocation={userLocation}
                pharmacies={pharmacies}
                height="500px"
                onRequestLocation={handleLocate}
              />
            </Suspense>
          ) : pharmacies.length === 0 && !loading ? (
            <div className="text-center py-20 text-gray-400 animate-fade-in">
              <Search size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium">Эмийн сан олдсонгүй</p>
              <p className="text-sm mt-1">Шүүлтүүрийг өөрчилнө үү</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {pharmacies.map((p) => (
                <PharmacyCard key={p._id} pharmacy={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}