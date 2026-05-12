import api from '../../api/axios';

export default function DiscountDelete({ discountId, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm('Delete this discount?')) return;
    try {
      await api.delete(`/discounts/${discountId}`);
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
