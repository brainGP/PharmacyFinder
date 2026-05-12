import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    lastName: { type: String, trim: true },
    firstName: { type: String, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    password: { type: String, select: false },
    phone: { type: String, trim: true },
    googleAuth: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin', 'owner', 'staff'], default: 'user' },
    refreshToken: { type: String, select: false },
    favorites: {
      pharmacies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' }],
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);
