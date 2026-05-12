import express from 'express';
import Discount from '../models/Discount.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.pharmacyId) filter.pharmacyId = req.query.pharmacyId;
    if (req.query.productId) filter.productId = req.query.productId;

    const discounts = await Discount.find(filter)
      .populate('productId', 'name price')
      .populate('pharmacyId', 'name');
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id)
      .populate('productId', 'name price')
      .populate('pharmacyId', 'name');
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const discount = await Discount.create(req.body);
    res.status(201).json(discount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json(discount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json({ message: 'Discount deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
