import { useState } from 'react';
import api from '../../api/axios';

export default function UserCreate({ onCreated }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/users/register', form);
      setForm({ firstName: '', lastName: '', email: '', password: '', phone: '', role: 'user' });
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold text-gray-700">Add User</h2>
      <div className="grid grid-cols-2 gap-3">
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border rounded px-3 py-2 text-sm w-full" />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="border rounded px-3 py-2 text-sm w-full" />
      </div>
      <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Password" className="border rounded px-3 py-2 text-sm w-full" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2 text-sm w-full" />
      <select name="role" value={form.role} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full">
        <option value="user">User</option>
        <option value="staff">Staff</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">Create</button>
    </form>
  );
}
