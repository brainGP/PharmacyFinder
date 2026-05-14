import express from 'express';
import Pharmacy from '../models/Pharmacy.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = req.query.search
      ? { $text: { $search: req.query.search } }
      : {};
    const pharmacies = await Pharmacy.find(filter).populate('owner', 'firstName lastName email');
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query;
    const pharmacies = await Pharmacy.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance),
        },
      },
    });
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id)
      .populate('owner', 'firstName lastName email')
      .populate('staff.userId', 'firstName lastName email');
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    res.json(pharmacy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);
    res.status(201).json(pharmacy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    res.json(pharmacy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });
    res.json({ message: 'Pharmacy deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/staff', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      { $push: { staff: req.body } },
      { new: true }
    );
    res.json(pharmacy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id/staff/:userId', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      { $pull: { staff: { userId: req.params.userId } } },
      { new: true }
    );
    res.json(pharmacy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
