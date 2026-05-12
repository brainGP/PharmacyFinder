import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const { password: _, ...userData } = user.toObject();
    res.json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('favorites.pharmacies')
      .populate('favorites.products');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/favorites/pharmacies/:pharmacyId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { 'favorites.pharmacies': req.params.pharmacyId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/favorites/products/:productId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { 'favorites.products': req.params.productId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
