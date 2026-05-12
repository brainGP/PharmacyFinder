import { useState } from 'react';
import api from '../../api/axios';

export default function PharmacyCreate({ onCreated }) {
  const [form, setForm] = useState({ name: '', branch: '', address: '', phone: '', workingHours: '', lng: '', lat: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { name, branch, address, phone, workingHours, lng, lat } = form;
      await api.post('/pharmacies', {
        name, branch, address, phone, workingHours,
        location: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      });
      setForm({ name: '', branch: '', address: '', phone: '', workingHours: '', lng: '', lat: '' });
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create pharmacy');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold text-gray-700">Add Pharmacy</h2>
      <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch (optional)" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="workingHours" value={form.workingHours} onChange={handleChange} placeholder="Working Hours e.g. 08:00-22:00" className="border rounded px-3 py-2 text-sm w-full" />
      <div className="grid grid-cols-2 gap-3">
        <input name="lng" value={form.lng} onChange={handleChange} required placeholder="Longitude" className="border rounded px-3 py-2 text-sm w-full" />
        <input name="lat" value={form.lat} onChange={handleChange} required placeholder="Latitude" className="border rounded px-3 py-2 text-sm w-full" />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">Create</button>
    </form>
  );
}
