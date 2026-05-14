"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronUp, Navigation } from "lucide-react";

const API = "http://localhost:8000";
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

type Pharmacy = {
  _id: string;
  name: string;
  address: string;
  workingHours: string;
  isOpen: boolean;
  location: { coordinates: [number, number] };
};

type Product = { _id: string; name: string; price: number };

export default function ClosestPharmaciesSection() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [products, setProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    // Try geolocation on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const pos: [number, number] = [coords.latitude, coords.longitude];
          setUserPos(pos);
          fetchNearby(pos);
        },
        () => fetchDefault()
      );
    } else {
      fetchDefault();
    }
  }, []);

  function fetchNearby(pos: [number, number]) {
    fetch(`${API}/api/pharmacies/nearby?lat=${pos[0]}&lng=${pos[1]}&maxDistance=10000`)
      .then((r) => r.json())
      .then((d) => setPharmacies(Array.isArray(d) ? d.slice(0, 6) : []))
      .catch(() => fetchDefault());
  }

  function fetchDefault() {
    fetch(`${API}/api/pharmacies?limit=6`)
      .then((r) => r.json())
      .then((d) => setPharmacies(Array.isArray(d) ? d : []))
      .catch(() => {});
  }

  function locate() {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos: [number, number] = [coords.latitude, coords.longitude];
        setUserPos(pos);
        fetchNearby(pos);
        setLocating(false);
      },
      () => setLocating(false)
    );
  }

  function toggle(id: string) {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    if (!products[id]) {
      fetch(`${API}/api/products?pharmacyId=${id}&limit=4`)
        .then((r) => r.json())
        .then((d) => setProducts((prev) => ({ ...prev, [id]: Array.isArray(d) ? d : [] })))
        .catch(() => {});
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {userPos ? "Хамгийн ойрхон эмийн сангууд" : "Эмийн сангууд"}
        </h2>
        <button
          onClick={locate}
          disabled={locating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm rounded-lg transition-colors"
        >
          <Navigation size={14} />
          {locating ? "Байршил тодорхойлж байна..." : "Байршил ашиглах"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pharmacy list */}
        <div className="flex-1 space-y-2">
          {pharmacies.length === 0 && (
            <p className="text-gray-400 text-sm py-8 text-center">Эмийн сан олдсонгүй.</p>
          )}
          {pharmacies.map((ph, i) => (
            <div key={ph._id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(ph._id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm">{ph.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ph.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {ph.isOpen ? "Нээлттэй" : "Хаалттай"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{ph.address}</p>
                    {ph.workingHours && <p className="text-xs text-gray-400">{ph.workingHours}</p>}
                  </div>
                </div>
                {expanded === ph._id
                  ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                  : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>

              {expanded === ph._id && (
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                  {!products[ph._id] ? (
                    <p className="text-xs text-gray-400">Уншиж байна...</p>
                  ) : products[ph._id].length === 0 ? (
                    <p className="text-xs text-gray-400">Бараа бүтээгдэхүүн байхгүй.</p>
                  ) : (
                    <div className="space-y-1">
                      {products[ph._id].map((p) => (
                        <div key={p._id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{p.name}</span>
                          <span className="text-green-600 font-medium">{p.price.toLocaleString()}₮</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="lg:w-120 h-110 rounded-xl overflow-hidden border border-gray-200">
          <LeafletMap pharmacies={pharmacies} userPos={userPos} />
        </div>
      </div>
    </section>
  );
}
