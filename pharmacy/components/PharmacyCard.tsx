"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Store, Copy, Check } from "lucide-react";

type Pharmacy = {
  _id: string;
  name: string;
  branch?: string;
  address: string;
  phone?: string;
  workingHours?: string;
  isOpen: boolean;
  icon?: string;
};

function CopyPhone({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(phone).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors group/phone w-full text-left"
    >
      <Phone size={13} className="text-gray-400 shrink-0" />
      <span className="flex-1">{phone}</span>
      {copied
        ? <Check size={12} className="text-green-500 shrink-0" />
        : <Copy size={12} className="text-gray-300 group-hover/phone:text-gray-400 shrink-0" />}
    </button>
  );
}

export default function PharmacyCard({ pharmacy }: { pharmacy: Pharmacy }) {
  return (
    <Link
      href={`/pharmacies/${pharmacy._id}`}
      className="bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 block group"
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          {pharmacy.icon ? (
            <img src={pharmacy.icon} alt={pharmacy.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
          ) : (
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 shrink-0">
              <Store size={24} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
              {pharmacy.name}
            </h3>
            {pharmacy.branch && (
              <p className="text-xs text-gray-500 mt-0.5">{pharmacy.branch} салбар</p>
            )}
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
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            pharmacy.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pharmacy.isOpen ? "bg-green-500" : "bg-red-400"}`} />
            {pharmacy.isOpen ? "Нээлттэй" : "Хаалттай"}
          </span>
        </div>
      </div>
    </Link>
  );
}
