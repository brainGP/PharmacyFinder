import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.js';
import pharmacyRoutes from './routes/pharmacies.js';
import productRoutes from './routes/products.js';
import adRoutes from './routes/ads.js';
import discountRoutes from './routes/discounts.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/discounts', discountRoutes);

app.get('/', (req, res) => res.json({ message: 'Pharmacy API running' }));

export default app;
