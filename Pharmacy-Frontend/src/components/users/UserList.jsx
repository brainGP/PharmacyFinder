import { useEffect, useState } from 'react';
import api from '../../api/axios';
import UserDelete from './UserDelete';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user._id} className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email} · {user.role}</p>
          </div>
          <UserDelete userId={user._id} onDeleted={fetchUsers} />
        </div>
      ))}
    </div>
  );
}
