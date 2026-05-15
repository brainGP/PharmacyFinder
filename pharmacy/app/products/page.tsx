"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Pill, Search, Package, MapPin, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const API = "http://localhost:8000";
const LIMIT = 12;

type PharmacyRef = { _id: string; name: string };
type Product = {
  _id: string;
  name: string;
  brand?: string;
  price: number;
  stock: number;
  status: string;
  category?: string;
  form?: string;
  symptoms?: string[];
  images?: string[];
  pharmacyId?: PharmacyRef;
};

type Filters = {
  search: string;
  category: string;
  form: string;
  status: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
};

const EMPTY: Filters = { search: "", category: "", form: "", status: "", minPrice: "", maxPrice: "", sort: "" };
const FORMS = ["Шахмал", "Хайрцаг", "Шингэн", "Тос", "Тариа", "Тавиур", "Оо"];

function statusBadge(s: string) {
  if (s === "active")       return { text: "Нөөцтэй",  cls: "bg-green-100 text-green-700" };
  if (s === "out_of_stock") return { text: "Нөөцгүй",  cls: "bg-red-100 text-red-600" };
  return                           { text: "Идэвхгүй", cls: "bg-gray-100 text-gray-500" };
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [fav, setFav] = useState(() => {
    if (typeof window === "undefined") return false;
    return (JSON.parse(localStorage.getItem("fav_products") || "[]") as string[]).includes(product._id);
  });
  const [copied, setCopied] = useState(false);
  const badge = statusBadge(product.status);

  function toggleFav(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    const ids = JSON.parse(localStorage.getItem("fav_products") || "[]") as string[];
    const next = fav ? ids.filter((id) => id !== product._id) : [...ids, product._id];
    localStorage.setItem("fav_products", JSON.stringify(next));
    setFav(!fav);
  }

  function share(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/products/${product._id}`)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
      .catch(() => {});
  }

  return (
    <Link
      href={`/products/${product._id}`}
      className="bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 block group"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="p-5">
        {/* Top row: icon + name + actions */}
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
            {product.images?.[0]
              ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              : <Package size={24} className="text-green-300" />}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate group-hover:text-green-600 transition-colors">
              {product.name}
            </p>
            {product.brand && <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>}
            {product.form  && <p className="text-xs text-gray-400">{product.form}</p>}
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <button onClick={share} className="p-1 rounded-full hover:bg-blue-50 transition-colors relative">
              <Share2 size={13} className="text-gray-400 hover:text-blue-500" />
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <button onClick={toggleFav} className="p-1 rounded-full hover:bg-red-50 transition-colors">
              <Heart size={14} className={fav ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
          </div>
        </div>

        {/* Symptom tags */}
        {(product.symptoms?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.symptoms!.slice(0, 2).map((s) => (
              <span key={s} className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-xs">{s}</span>
            ))}
          </div>
        )}

        {/* Price + badge */}
        <div className="mt-3 flex items-center justify-between">
          <p className="font-bold text-green-600">{product.price.toLocaleString()}₮</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
            {badge.text}
          </span>
        </div>

        {/* Pharmacy */}
        {product.pharmacyId && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{product.pharmacyId.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, search: searchParams.get("search") ?? "" });
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSearch = useRef(filters.search);

  useEffect(() => {
    fetch(`${API}/api/products/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const searchChanged = filters.search !== prevSearch.current;
    prevSearch.current = filters.search;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const run = () => {
      const p = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (filters.search)   p.set("search",   filters.search);
      if (filters.category) p.set("category", filters.category);
      if (filters.form)     p.set("form",     filters.form);
      if (filters.status)   p.set("status",   filters.status);
      if (filters.minPrice) p.set("minPrice", filters.minPrice);
      if (filters.maxPrice) p.set("maxPrice", filters.maxPrice);
      if (filters.sort)     p.set("sort",     filters.sort);
      setLoading(true);
      fetch(`${API}/api/products?${p}`)
        .then((r) => r.json())
        .then((d) => { setProducts(d.products ?? []); setTotal(d.total ?? 0); })
        .catch(() => {})
        .finally(() => setLoading(false));
    };

    debounceRef.current = searchChanged ? setTimeout(run, 280) : (run(), null);
  }, [filters, page]);

  function handleFilter(patch: Partial<Filters>) {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  }

  const hasFilters = Object.values(filters).some(Boolean);
  const totalPages = Math.ceil(total / LIMIT);
  const pageNums = (() => {
    const arr: number[] = [];
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    for (let i = start; i <= Math.min(totalPages, start + 4); i++) arr.push(i);
    return arr;
  })();

  const selectCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400";
  const labelCls  = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
          <Pill size={22} className="text-green-600" /> Бүтээгдэхүүн
        </h1>

        <div className="flex gap-6 items-start">

          {/* ── Filter sidebar ───────────────────────── */}
          <aside className="w-60 shrink-0 sticky top-24 rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 flex items-center gap-2">
              <Search size={14} className="text-white/80" />
              <span className="text-sm font-bold text-white tracking-wide">Шүүлтүүр</span>
              {hasFilters && (
                <button onClick={() => { setFilters(EMPTY); setPage(1); }}
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
                  <input type="text" value={filters.search} onChange={(e) => handleFilter({ search: e.target.value })}
                    placeholder="Эм хайх..."
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                </div>
              </div>

              {/* Category */}
              <div className="px-4 py-3 space-y-1.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Ангилал</p>
                <select value={filters.category} onChange={(e) => handleFilter({ category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition">
                  <option value="">Бүх ангилал</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Form */}
              <div className="px-4 py-3 space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Хэлбэр</p>
                <div className="flex flex-wrap gap-1.5">
                  {["", ...FORMS].map((f) => (
                    <button key={f} onClick={() => handleFilter({ form: f })}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                        filters.form === f
                          ? "bg-green-600 text-white border-green-600 shadow-sm"
                          : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-600"
                      }`}>
                      {f || "Бүгд"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="px-4 py-3 space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Нөөц</p>
                <div className="flex gap-1.5">
                  {[["", "Бүгд"], ["active", "Нөөцтэй"], ["out_of_stock", "Нөөцгүй"]].map(([val, label]) => (
                    <button key={val} onClick={() => handleFilter({ status: val })}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        filters.status === val
                          ? val === "active"    ? "bg-green-600 text-white border-green-600"
                          : val === "out_of_stock" ? "bg-red-500 text-white border-red-500"
                          : "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="px-4 py-3 space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Үнийн хязгаар</p>
                <div className="flex gap-2 items-center">
                  <input type="number" value={filters.minPrice} onChange={(e) => handleFilter({ minPrice: e.target.value })}
                    placeholder="Мин"
                    className="w-1/2 border border-gray-200 rounded-xl px-2 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-center" />
                  <span className="text-gray-300 text-sm">—</span>
                  <input type="number" value={filters.maxPrice} onChange={(e) => handleFilter({ maxPrice: e.target.value })}
                    placeholder="Макс"
                    className="w-1/2 border border-gray-200 rounded-xl px-2 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-center" />
                </div>
                {(filters.minPrice || filters.maxPrice) && (
                  <p className="text-[11px] text-green-600 text-center">
                    {filters.minPrice || "0"}₮ — {filters.maxPrice || "∞"}₮
                  </p>
                )}
              </div>

              {/* Sort */}
              <div className="px-4 py-3 space-y-1.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Эрэмбэлэх</p>
                <select value={filters.sort} onChange={(e) => handleFilter({ sort: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition">
                  <option value="">Үндсэн</option>
                  <option value="price_asc">Үнэ: бага → их</option>
                  <option value="price_desc">Үнэ: их → бага</option>
                  <option value="name_asc">Нэр: А → Я</option>
                  <option value="latest">Шинэ нэмэгдсэн</option>
                </select>
              </div>

            </div>
          </aside>

          {/* ── Products grid ────────────────────────── */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-gray-700">{total}</span> бүтээгдэхүүн олдлоо
              {filters.search && <span className="ml-1 text-green-600">«{filters.search}»</span>}
            </p>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-44 bg-white border border-gray-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Package size={48} className="mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-500">Бүтээгдэхүүн олдсонгүй</p>
                <p className="text-sm mt-1 text-gray-400">Шүүлтүүрийг өөрчилнө үү</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft size={16} />
                </button>
                {pageNums.map((n) => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${n === page ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
