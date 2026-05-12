import api from '../../api/axios';

export default function AdDelete({ adId, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm('Delete this ad?')) return;
    try {
      await api.delete(`/ads/${adId}`);
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
