import express from 'express';
import Ad from '../models/Ad.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.pharmacyId) filter.pharmacyId = req.query.pharmacyId;
    if (req.query.type) filter.type = req.query.type;

    const ads = await Ad.find(filter)
      .populate('pharmacyId', 'name')
      .populate('productId', 'name price');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id)
      .populate('pharmacyId', 'name')
      .populate('productId', 'name price');
    if (!ad) return res.status(404).json({ error: 'Ad not found' });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ad) return res.status(404).json({ error: 'Ad not found' });
    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ error: 'Ad not found' });
    res.json({ message: 'Ad deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
