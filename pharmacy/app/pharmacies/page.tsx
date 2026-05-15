"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Store, MapPin, Phone, Clock, LayoutGrid, Map as MapIcon, Search, Navigation, Heart, Share2, Copy, Check } from "lucide-react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const LeafletMap = dynamic(() => import("../../components/LeafletMap"), { ssr: false });

const API = "http://localhost:8000";

type Pharmacy = {
  _id: string;
  name: string;
  branch?: string;
  address: string;
  phone?: string;
  workingHours?: string;
  isOpen: boolean;
  icon?: string;
  location: { coordinates: [number, number] };
};

function CopyPhone({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation();
        navigator.clipboard.writeText(phone).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => {});
      }}
      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors group/phone w-full text-left"
    >
      <Phone size={13} className="text-gray-400 shrink-0" />
      <span className="flex-1">{phone}</span>
      {copied ? <Check size={12} className="text-green-500 shrink-0" /> : <Copy size={12} className="text-gray-300 group-hover/phone:text-gray-400 shrink-0" />}
    </button>
  );
}

function PharmacyCard({ pharmacy, index }: { pharmacy: Pharmacy; index: number }) {
  const [fav, setFav] = useState(() => {
    if (typeof window === "undefined") return false;
    const ids: string[] = JSON.parse(localStorage.getItem("fav_pharmacies") || "[]");
    return ids.includes(pharmacy._id);
  });
  const [copied, setCopied] = useState(false);

  function toggleFav(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    const ids: string[] = JSON.parse(localStorage.getItem("fav_pharmacies") || "[]");
    const next = fav ? ids.filter((id) => id !== pharmacy._id) : [...ids, pharmacy._id];
    localStorage.setItem("fav_pharmacies", JSON.stringify(next));
    setFav(!fav);
  }

  function share(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/pharmacies/${pharmacy._id}`).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const initials = pharmacy.name.charAt(0).toUpperCase();

  return (
    <Link
      href={`/pharmacies/${pharmacy._id}`}
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block group"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          {pharmacy.icon ? (
            <img src={pharmacy.icon} alt={pharmacy.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-gray-400">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
              {pharmacy.name}
            </h3>
            {pharmacy.branch && <p className="text-xs text-gray-500 mt-0.5">{pharmacy.branch} салбар</p>}
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <button onClick={share} className="p-1 rounded-full hover:bg-blue-50 transition-colors relative" title="Хуваалцах">
              <Share2 size={14} className="text-gray-400 hover:text-blue-500" />
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">Copied!</span>
              )}
            </button>
            <button onClick={toggleFav} className="p-1 rounded-full hover:bg-red-50 transition-colors">
              <Heart size={17} className={fav ? "fill-red-500 text-red-500" : "text-gray-400"} />
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
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${pharmacy.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pharmacy.isOpen ? "bg-green-500" : "bg-red-400"}`} />
            {pharmacy.isOpen ? "Нээлттэй" : "Хаалттай"}
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [maxDistance, setMaxDistance] = useState(20000);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    fetchPharmacies();
  }, [onlyOpen]);

  function fetchPharmacies(pos?: [number, number]) {
    setLoading(true);
    const activePos = pos ?? userPos;
    let url: string;

    if (activePos) {
      const dist = maxDistance < 20000 ? maxDistance : 50000;
      url = `${API}/api/pharmacies/nearby?lat=${activePos[0]}&lng=${activePos[1]}&maxDistance=${dist}`;
    } else {
      const params = new URLSearchParams();
      if (onlyOpen) params.set("isOpen", "true");
      if (search) params.set("search", search);
      url = `${API}/api/pharmacies?${params}`;
    }

    fetch(url)
      .then((r) => r.json())
      .then((d) => setPharmacies(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  function locate() {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos: [number, number] = [coords.latitude, coords.longitude];
        setUserPos(pos);
        fetchPharmacies(pos);
        setLocating(false);
      },
      () => { alert("Байршил авах боломжгүй."); setLocating(false); }
    );
  }

  const filtered = pharmacies.filter((p) => {
    const matchSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchSearch && (onlyOpen ? p.isOpen : true);
  });

  const hasFilters = search || onlyOpen || (userPos && maxDistance < 20000);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Title row */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Store size={22} className="text-green-600" /> Эмийн сангууд
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button onClick={() => setViewMode("grid")} className={`px-3 py-2 transition-colors ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                <LayoutGrid size={15} />
              </button>
              <button onClick={() => setViewMode("map")} className={`px-3 py-2 transition-colors ${viewMode === "map" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                <MapIcon size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* ── Sidebar ──────────────────────────────── */}
          <aside className="w-60 shrink-0 sticky top-24 rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 flex items-center gap-2">
              <Search size={14} className="text-white/80" />
              <span className="text-sm font-bold text-white tracking-wide">Шүүлтүүр</span>
              {hasFilters && (
                <button onClick={() => { setSearch(""); setOnlyOpen(false); setMaxDistance(20000); setUserPos(null); fetchPharmacies(); }}
                  className="ml-auto text-white/70 hover:text-white text-xs underline underline-offset-2 transition-colors">
                  Цэвэрлэх
                </button>
              )}
            </div>

            <div className="divide-y divide-gray-100">

              {/* Search */}
              <div className="px-4 py-3">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Нэр, хаяг..."
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                </div>
              </div>

              {/* Open now toggle */}
              <div className="px-4 py-3">
                <button onClick={() => setOnlyOpen(!onlyOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    onlyOpen
                      ? "bg-green-50 border-green-300 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-green-200"
                  }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${onlyOpen ? "bg-green-500" : "bg-gray-300"}`} />
                    Зөвхөн нээлттэй
                  </div>
                  <div className={`w-9 h-5 rounded-full relative transition-colors ${onlyOpen ? "bg-green-500" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${onlyOpen ? "left-4" : "left-0.5"}`} />
                  </div>
                </button>
              </div>

              {/* Location */}
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Байршил</p>
                <button onClick={locate} disabled={locating}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium border transition-all ${
                    userPos
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                  }`}>
                  <Navigation size={13} className={userPos ? "text-blue-500" : "text-gray-400"} />
                  {locating ? "Байршилж байна..." : userPos ? "Байршил идэвхтэй" : "Байршил оруулах"}
                </button>
              </div>

              {/* Distance slider */}
              {userPos && (
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Зай</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${maxDistance >= 20000 ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
                      {maxDistance >= 20000 ? "Бүх зай" : `${(maxDistance / 1000).toFixed(0)} км`}
                    </span>
                  </div>
                  <input type="range" min={500} max={20000} step={500} value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>0.5 км</span><span>Бүгд</span>
                  </div>
                </div>
              )}

            </div>
          </aside>

          {/* ── Main content ─────────────────────────── */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-gray-700">{filtered.length}</span> эмийн сан олдлоо
              {userPos && <span className="ml-2 text-green-600">· Байршлаараа эрэмбэлэгдсэн</span>}
            </p>

            {viewMode === "map" ? (
              <div className="h-[500px] rounded-xl overflow-hidden border border-gray-200 relative">
                <LeafletMap pharmacies={filtered} userPos={userPos} />
                {!userPos && (
                  <button
                    onClick={locate}
                    className="absolute bottom-4 right-4 z-[1000] flex items-center gap-2 px-3 py-2 bg-white shadow-md border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-green-300 transition-colors"
                  >
                    <Navigation size={14} className="text-green-600" /> Байршил оруулах
                  </button>
                )}
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Search size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="font-medium text-gray-500">Эмийн сан олдсонгүй</p>
                <p className="text-sm mt-1">Шүүлтүүрийг өөрчилнө үү</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p, i) => <PharmacyCard key={p._id} pharmacy={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
