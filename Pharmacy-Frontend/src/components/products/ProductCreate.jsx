import { useState } from 'react';
import api from '../../api/axios';

export default function ProductCreate({ onCreated }) {
  const [form, setForm] = useState({ name: '', brand: '', price: '', stock: '', category: '', form: '', pharmacyId: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock) });
      setForm({ name: '', brand: '', price: '', stock: '', category: '', form: '', pharmacyId: '' });
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold text-gray-700">Add Product</h2>
      <div className="grid grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border rounded px-3 py-2 text-sm w-full" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border rounded px-3 py-2 text-sm w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="price" value={form.price} onChange={handleChange} required type="number" placeholder="Price" className="border rounded px-3 py-2 text-sm w-full" />
        <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Stock" className="border rounded px-3 py-2 text-sm w-full" />
      </div>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="form" value={form.form} onChange={handleChange} placeholder="Form (tablet, capsule...)" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="pharmacyId" value={form.pharmacyId} onChange={handleChange} required placeholder="Pharmacy ID" className="border rounded px-3 py-2 text-sm w-full" />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">Create</button>
    </form>
  );
}
