import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ['active', 'out_of_stock', 'inactive'],
      default: 'active',
    },
    category: { type: String, trim: true },
    form: { type: String, trim: true },
    symptoms: [{ type: String }],
    description: { type: String },
    usage: { type: String },
    ingredients: { type: String },
    warning: { type: String },
    images: [{ type: String }],
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', brand: 'text', symptoms: 'text' });

export default mongoose.model('Product', productSchema);
