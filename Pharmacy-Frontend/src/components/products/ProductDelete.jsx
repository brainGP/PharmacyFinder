import api from '../../api/axios';

export default function ProductDelete({ productId, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${productId}`);
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
