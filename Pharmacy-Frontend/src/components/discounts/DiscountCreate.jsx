import { useState } from 'react';
import api from '../../api/axios';

export default function DiscountCreate({ onCreated }) {
  const [form, setForm] = useState({ productId: '', pharmacyId: '', percentage: '', startDate: '', endDate: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/discounts', { ...form, percentage: Number(form.percentage) });
      setForm({ productId: '', pharmacyId: '', percentage: '', startDate: '', endDate: '' });
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create discount');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold text-gray-700">Add Discount</h2>
      <input name="productId" value={form.productId} onChange={handleChange} required placeholder="Product ID" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="pharmacyId" value={form.pharmacyId} onChange={handleChange} required placeholder="Pharmacy ID" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="percentage" value={form.percentage} onChange={handleChange} required type="number" min="1" max="100" placeholder="Percentage (1-100)" className="border rounded px-3 py-2 text-sm w-full" />
      <div className="grid grid-cols-2 gap-3">
        <input name="startDate" value={form.startDate} onChange={handleChange} required type="date" className="border rounded px-3 py-2 text-sm w-full" />
        <input name="endDate" value={form.endDate} onChange={handleChange} required type="date" className="border rounded px-3 py-2 text-sm w-full" />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">Create</button>
    </form>
  );
}
