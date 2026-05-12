import mongoose from 'mongoose';

const adSchema = new mongoose.Schema(
  {
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    type: { type: String, enum: ['news', 'promo'], required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    images: [{ type: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Ad', adSchema);
