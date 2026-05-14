"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package } from "lucide-react";

const API = "http://localhost:8000";

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  images: string[];
};

export default function LatestProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API}/api/products?limit=10&sort=latest&status=active`)
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Шинэ бүтээгдэхүүн</h2>
          <Link href="/products" className="text-sm text-green-600 hover:underline">
            Бүгдийг харах →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {products.map((p) => (
            <Link
              key={p._id}
              href={`/products/${p._id}`}
              className="shrink-0 w-44 bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <Package size={36} className="text-gray-300" />
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{p.name}</p>
                {p.brand && <p className="text-xs text-gray-400 mt-0.5">{p.brand}</p>}
                <p className="text-green-600 font-bold text-sm mt-1">{p.price.toLocaleString()}₮</p>
                <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                  p.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}>
                  {p.stock > 0 ? "Нөөцтэй" : "Нөөцгүй"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
