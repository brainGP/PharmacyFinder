import api from '../../api/axios';

export default function PharmacyDelete({ pharmacyId, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm('Delete this pharmacy?')) return;
    try {
      await api.delete(`/pharmacies/${pharmacyId}`);
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
