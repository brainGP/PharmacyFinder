import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    branch: { type: String, trim: true },
    location: {
      type: { type: String, default: 'Point', enum: ['Point'] },
      coordinates: { type: [Number], required: true },
    },
    address: { type: String, required: true },
    phone: { type: String },
    workingHours: { type: String },
    isOpen: { type: Boolean, default: false },
    icon: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    staff: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['manager', 'pharmacist', 'cashier'], default: 'pharmacist' },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

pharmacySchema.index({ location: '2dsphere' });
pharmacySchema.index({ name: 'text' });

export default mongoose.model('Pharmacy', pharmacySchema);
