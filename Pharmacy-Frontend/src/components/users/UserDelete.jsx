import api from '../../api/axios';

export default function UserDelete({ userId, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      onDeleted?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleDelete} className="text-sm text-red-500 hover:text-red-700">
      Delete
    </button>
  );
}
