import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Heart, Share2, Copy, Check } from 'lucide-react';
import useStore from '../store/useStore.js';
import ShareModal from './ShareModal.jsx';

function CopyPhone({ phone }) {
  const [copied, setCopied] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors group/phone w-full text-left"
    >
      <Phone size={13} className="text-gray-400 shrink-0" />
      <span className="flex-1">{phone}</span>
      {copied ? (
        <Check size={12} className="text-green-500 shrink-0" />
      ) : (
        <Copy
          size={12}
          className="text-gray-300 group-hover/phone:text-gray-400 shrink-0 transition-colors"
        />
      )}
    </button>
  );
}

export default function PharmacyCard({ pharmacy }) {
  const { favorites, toggleFavoritePharmacy } = useStore();
  const [showShare, setShowShare] = useState(false);
  const isFav = favorites.pharmacies.includes(pharmacy._id);

  const stop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <Link
        to={`/pharmacies/${pharmacy._id}`}
        className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 block group"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              {pharmacy.logo ? (
                <img
                  src={pharmacy.logo}
                  alt={pharmacy.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : pharmacy.images?.length ? (
                <img
                  src={pharmacy.images[0]}
                  alt={pharmacy.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300">
                  <Store size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                {pharmacy.name}
              </h3>
              {pharmacy.branch && (
                <p className="text-xs text-gray-500 mt-0.5">{pharmacy.branch} салбар</p>
              )}
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={(e) => {
                  stop(e);
                  setShowShare(true);
                }}
                className="p-1 rounded-full hover:bg-blue-50 transition-colors group/share"
                aria-label="Хуваалцах"
              >
                <Share2
                  size={15}
                  className="text-gray-400 group-hover/share:text-blue-500 transition-colors"
                />
              </button>
              <button
                onClick={(e) => {
                  stop(e);
                  toggleFavoritePharmacy(pharmacy._id);
                }}
                className="p-1 rounded-full bg-gray-100 hover:bg-red-50 transition-colors group/heart"
                aria-label="Дуртай нэмэх"
              >
                <Heart
                  size={18}
                  className={
                    isFav
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400 group-hover/heart:text-red-400 transition-colors'
                  }
                />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin size={13} className="text-gray-400 shrink-0" />
              <span className="truncate">{pharmacy.address}</span>
            </div>
            {pharmacy.phone && <CopyPhone phone={pharmacy.phone} />}
            {pharmacy.workingHours && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Clock size={13} className="text-gray-400 shrink-0" />
                <span>{pharmacy.workingHours}</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                pharmacy.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${pharmacy.isOpen ? 'bg-green-500' : 'bg-red-400'}`}
              />
              {pharmacy.isOpen ? 'Нээлттэй' : 'Хаалттай'}
            </span>
          </div>
        </div>
      </Link>

      {showShare && (
        <ShareModal item={pharmacy} type="pharmacy" onClose={() => setShowShare(false)} />
      )}
    </>
  );
}