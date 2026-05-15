import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { category: { $ne: null, $ne: '' } });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.pharmacyId) filter.pharmacyId = req.query.pharmacyId;
    if (req.query.category)   filter.category = req.query.category;
    if (req.query.form)       filter.form = req.query.form;
    if (req.query.status)     filter.status = req.query.status;
    if (req.query.search)     filter.$text = { $search: req.query.search };
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    const sortMap = {
      price_asc:  { price: 1 },
      price_desc: { price: -1 },
      name_asc:   { name: 1 },
      latest:     { createdAt: -1 },
    };
    const sort = sortMap[req.query.sort] || {};

    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const page  = req.query.page  ? parseInt(req.query.page)  : 1;
    const skip  = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).populate('pharmacyId', 'name address').sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('pharmacyId', 'name address');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
