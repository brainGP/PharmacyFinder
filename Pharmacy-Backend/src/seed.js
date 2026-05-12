import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Pharmacy from './models/Pharmacy.js';
import Product from './models/Product.js';
import Ad from './models/Ad.js';
import Discount from './models/Discount.js';

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

try {
  await User.collection.dropIndex('nickname_1');
} catch (_) {}

await Promise.all([
  User.deleteMany(),
  Pharmacy.deleteMany(),
  Product.deleteMany(),
  Ad.deleteMany(),
  Discount.deleteMany(),
]);
console.log('Cleared existing data');

const hashedPassword = await bcrypt.hash('password123', 12);

const users = await User.insertMany([
  { firstName: 'Bat-Orgil', lastName: 'Erdenebold', email: 'batorgi@gmail.com', password: hashedPassword, phone: '99001122', role: 'admin' },
  { firstName: 'Oyunaa', lastName: 'Gantulga', email: 'oyunaa@gmail.com', password: hashedPassword, phone: '99112233', role: 'owner' },
  { firstName: 'Enkhjin', lastName: 'Boldbaatar', email: 'enkhjin@gmail.com', password: hashedPassword, phone: '99223344', role: 'owner' },
  { firstName: 'Tsolmon', lastName: 'Namsrai', email: 'tsolmon@gmail.com', password: hashedPassword, phone: '99334455', role: 'staff' },
  { firstName: 'Narantsetseg', lastName: 'Dorj', email: 'narantsetseg@gmail.com', password: hashedPassword, phone: '99445566', role: 'staff' },
  { firstName: 'Ankhbayar', lastName: 'Sukhbaatar', email: 'ankhbayar@gmail.com', password: hashedPassword, phone: '99556677', role: 'staff' },
  { firstName: 'Solongo', lastName: 'Purev', email: 'solongo@gmail.com', password: hashedPassword, phone: '99667788', role: 'user' },
  { firstName: 'Gantulga', lastName: 'Ochir', email: 'gantulga@gmail.com', password: hashedPassword, phone: '99778899', role: 'user' },
  { firstName: 'Munkhjargal', lastName: 'Bat', email: 'munkhjargal@gmail.com', password: hashedPassword, phone: '99889900', role: 'user' },
  { firstName: 'Erdenechimeg', lastName: 'Tserenpuntsag', email: 'erdenechimeg@gmail.com', password: hashedPassword, phone: '99990011', role: 'user' },
  { firstName: 'Temuujin', lastName: 'Lkhagva', email: 'temuujin@gmail.com', password: hashedPassword, phone: '88001122', role: 'user' },
  { firstName: 'Bayarmaa', lastName: 'Ganbaatar', email: 'bayarmaa@gmail.com', password: hashedPassword, phone: '88112233', role: 'user' },
]);
console.log(`Inserted ${users.length} users`);

const pharmacies = await Pharmacy.insertMany([
  {
    name: 'Монос Эмийн Сан', branch: 'Хан-Уул',
    location: { type: 'Point', coordinates: [106.9057, 47.8864] },
    address: 'Хан-Уул дүүрэг, 3-р хороо',
    phone: '75750000', workingHours: '08:00-22:00', isOpen: true,
    owner: users[1]._id,
    staff: [
      { userId: users[3]._id, role: 'manager' },
      { userId: users[4]._id, role: 'pharmacist' },
    ],
  },
  {
    name: 'Монос Эмийн Сан', branch: 'Сүхбаатар',
    location: { type: 'Point', coordinates: [106.9175, 47.9076] },
    address: 'Сүхбаатар дүүрэг, 1-р хороо',
    phone: '75750001', workingHours: '08:00-22:00', isOpen: true,
    owner: users[1]._id,
    staff: [{ userId: users[5]._id, role: 'pharmacist' }],
  },
  {
    name: 'Анод Эмийн Сан', branch: 'Баянзүрх',
    location: { type: 'Point', coordinates: [106.9400, 47.9200] },
    address: 'Баянзүрх дүүрэг, 5-р хороо',
    phone: '70110011', workingHours: '09:00-21:00', isOpen: true,
    owner: users[2]._id,
    staff: [{ userId: users[3]._id, role: 'cashier' }],
  },
  {
    name: 'Хүн Эмийн Сан', branch: 'Баянгол',
    location: { type: 'Point', coordinates: [106.8800, 47.9100] },
    address: 'Баянгол дүүрэг, 4-р хороо',
    phone: '70220022', workingHours: '24/7', isOpen: true,
    owner: users[2]._id,
  },
  {
    name: 'Эрдэнэт Эмийн Сан',
    location: { type: 'Point', coordinates: [106.8960, 47.8980] },
    address: 'Чингэлтэй дүүрэг, 2-р хороо',
    phone: '70330033', workingHours: '08:00-20:00', isOpen: false,
    owner: users[1]._id,
  },
  {
    name: 'Номун Эмийн Сан',
    location: { type: 'Point', coordinates: [106.9300, 47.9050] },
    address: 'Баянзүрх дүүрэг, 7-р хороо',
    phone: '70440044', workingHours: '09:00-21:00', isOpen: true,
    owner: users[2]._id,
    staff: [{ userId: users[4]._id, role: 'pharmacist' }],
  },
  {
    name: 'Гранд Эмийн Сан',
    location: { type: 'Point', coordinates: [106.9100, 47.9150] },
    address: 'Сүхбаатар дүүрэг, 8-р хороо',
    phone: '70550055', workingHours: '08:00-22:00', isOpen: true,
    owner: users[1]._id,
  },
  {
    name: 'Сайхан Эмийн Сан',
    location: { type: 'Point', coordinates: [106.8750, 47.9000] },
    address: 'Баянгол дүүрэг, 6-р хороо',
    phone: '70660066', workingHours: '09:00-20:00', isOpen: false,
    owner: users[2]._id,
    staff: [{ userId: users[5]._id, role: 'manager' }],
  },
  {
    name: 'Алтан Эмийн Сан',
    location: { type: 'Point', coordinates: [106.9220, 47.8900] },
    address: 'Хан-Уул дүүрэг, 11-р хороо',
    phone: '70770077', workingHours: '08:00-21:00', isOpen: true,
    owner: users[1]._id,
  },
  {
    name: 'Мандал Эмийн Сан',
    location: { type: 'Point', coordinates: [106.9500, 47.9300] },
    address: 'Налайх дүүрэг, 1-р хороо',
    phone: '70880088', workingHours: '09:00-18:00', isOpen: true,
    owner: users[2]._id,
  },
  {
    name: 'Хурдан Эмийн Сан',
    location: { type: 'Point', coordinates: [106.8600, 47.8850] },
    address: 'Баянгол дүүрэг, 3-р хороо',
    phone: '70990099', workingHours: '24/7', isOpen: true,
    owner: users[1]._id,
    staff: [{ userId: users[3]._id, role: 'pharmacist' }],
  },
]);
console.log(`Inserted ${pharmacies.length} pharmacies`);

const products = await Product.insertMany([
  {
    name: 'Парацетамол', brand: 'Монос', price: 2500, stock: 200, status: 'active',
    category: 'Өвдөлт намдаагч', form: 'Таблет',
    symptoms: ['халуурах', 'толгой өвдөх', 'биеийн өвдөлт'],
    description: 'Халуур болон өвдөлт намдаах эм', usage: 'Насанд хүрсэн: 500мг 4-6 цаг тутам',
    warning: '24 цагт 4г-аас хэтрүүлж болохгүй', pharmacyId: pharmacies[0]._id,
  },
  {
    name: 'Ибупрофен', brand: 'Анод', price: 3200, stock: 150, status: 'active',
    category: 'Өвдөлт намдаагч', form: 'Таблет',
    symptoms: ['халуурах', 'үений өвдөлт', 'шүдний өвдөлт'],
    description: 'Үрэвсэл намдаах, халуур бууруулах', usage: '400мг 6-8 цаг тутам',
    warning: 'Хоол идсэний дараа уух', pharmacyId: pharmacies[0]._id,
  },
  {
    name: 'Амоксициллин', brand: 'Хүн', price: 8500, stock: 80, status: 'active',
    category: 'Антибиотик', form: 'Капсул',
    symptoms: ['хоолой өвдөх', 'чихний халдвар', 'уушгины үрэвсэл'],
    description: 'Өргөн хүрээний антибиотик', usage: '500мг 8 цаг тутам 7 хоног',
    warning: 'Эмчийн жороор авах', pharmacyId: pharmacies[1]._id,
  },
  {
    name: 'Витамин С', brand: 'Монос', price: 4500, stock: 300, status: 'active',
    category: 'Витамин', form: 'Таблет',
    symptoms: ['дархлаа сулрах', 'ядрах'],
    description: 'С витамин 500мг', usage: 'Өдөрт 1 ширхэг',
    pharmacyId: pharmacies[1]._id,
  },
  {
    name: 'Омепразол', brand: 'Эрдэнэт', price: 6800, stock: 120, status: 'active',
    category: 'Ходоод гэдэс', form: 'Капсул',
    symptoms: ['ходоодны хүчил', 'гэрэглэх'],
    description: 'Ходоодны хүчил багасгах', usage: 'Өглөө өлөн 20мг',
    pharmacyId: pharmacies[2]._id,
  },
  {
    name: 'Метформин', brand: 'Номун', price: 5500, stock: 90, status: 'active',
    category: 'Чихрийн шижин', form: 'Таблет',
    symptoms: ['чихрийн шижин', 'цусны сахар ихсэх'],
    description: '2-р хэлбэрийн чихрийн шижин эмчлэх', usage: 'Хоолны дараа 500мг',
    warning: 'Эмчийн жороор авах', pharmacyId: pharmacies[2]._id,
  },
  {
    name: 'Лоратадин', brand: 'Гранд', price: 3800, stock: 180, status: 'active',
    category: 'Харшлын эсрэг', form: 'Таблет',
    symptoms: ['харшил', 'хамрын гоожих', 'нүд загатнах'],
    description: 'Харшлын эсрэг эм', usage: 'Өдөрт 1x10мг',
    pharmacyId: pharmacies[3]._id,
  },
  {
    name: 'Азитромицин', brand: 'Монос', price: 12000, stock: 60, status: 'active',
    category: 'Антибиотик', form: 'Таблет',
    symptoms: ['амьсгалын замын халдвар', 'хоолой өвдөх'],
    description: 'Антибиотик - 3 хоногийн курс', usage: '500мг өдөрт 1 удаа 3 хоног',
    warning: 'Эмчийн жороор авах', pharmacyId: pharmacies[3]._id,
  },
  {
    name: 'Но-Шпа', brand: 'Sanofi', price: 4200, stock: 250, status: 'active',
    category: 'Спазмолитик', form: 'Таблет',
    symptoms: ['гэдэс агших', 'ходоод өвдөх'],
    description: 'Гөлгөр булчингийн спазм намдаах', usage: '40мг өдөрт 3 удаа',
    pharmacyId: pharmacies[4]._id,
  },
  {
    name: 'Валидол', brand: 'Алтан', price: 1800, stock: 0, status: 'out_of_stock',
    category: 'Зүрхний эм', form: 'Таблет',
    symptoms: ['зүрх эмзэглэх', 'стресс'],
    description: 'Зүрхний өвдөлт, стресс намдаах', usage: 'Хэл доор уусгах',
    pharmacyId: pharmacies[4]._id,
  },
  {
    name: 'Нурофен', brand: 'Reckitt', price: 7500, stock: 110, status: 'active',
    category: 'Өвдөлт намдаагч', form: 'Шингэн',
    symptoms: ['халуурах', 'толгой өвдөх', 'шүдний өвдөлт'],
    description: 'Хүүхдэд зориулсан ибупрофен сироп', usage: 'Насаар тооцсон тун',
    pharmacyId: pharmacies[5]._id,
  },
  {
    name: 'Цетиризин', brand: 'Номун', price: 3500, stock: 140, status: 'active',
    category: 'Харшлын эсрэг', form: 'Таблет',
    symptoms: ['харшил', 'арьс загатнах'],
    description: '2-р үеийн антигистамин', usage: 'Өдөрт 1x10мг',
    pharmacyId: pharmacies[5]._id,
  },
  {
    name: 'Пантопразол', brand: 'Сайхан', price: 7200, stock: 75, status: 'active',
    category: 'Ходоод гэдэс', form: 'Таблет',
    symptoms: ['ходоодны шарх', 'хүчил рефлюкс'],
    description: 'Протон помпын дарангуйлагч', usage: 'Өглөө өлөн 40мг',
    warning: 'Эмчийн жороор авах', pharmacyId: pharmacies[6]._id,
  },
]);
console.log(`Inserted ${products.length} products`);

const now = new Date();
const ads = await Ad.insertMany([
  {
    pharmacyId: pharmacies[0]._id, productId: products[0]._id,
    type: 'promo', title: 'Парацетамол хямдрал!',
    description: 'Энэ долоо хоногт Парацетамол 20% хямдралтай',
    startDate: now, endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[0]._id,
    type: 'news', title: 'Шинэ цагийн хуваарь',
    description: 'Монос Хан-Уул салбар 24/7 горимд шилжлээ',
    startDate: now, endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[1]._id, productId: products[3]._id,
    type: 'promo', title: 'Витамин С авцгаая!',
    description: '2 авбал 1 үнэгүй. Дархлаагаа бэхжүүлье.',
    startDate: now, endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[1]._id,
    type: 'news', title: 'Шинэ эм нийлүүлэлт',
    description: 'Европоос импортолсон шинэ эмнүүд ирлээ',
    startDate: now, endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[2]._id, productId: products[4]._id,
    type: 'promo', title: 'Омепразол хямдрал',
    description: 'Ходоодны өвчтэй хүмүүст 15% хямдрал',
    startDate: now, endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[2]._id,
    type: 'news', title: 'Онлайн захиалга нээлттэй',
    description: 'Анод Эмийн Сан онлайн захиалга хүргэлт эхлүүллээ',
    startDate: now, endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[3]._id, productId: products[6]._id,
    type: 'promo', title: 'Харшлын улирал - хямдрал',
    description: 'Хавар ирлээ! Лоратадин 25% хямдралтай',
    startDate: now, endDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[3]._id,
    type: 'news', title: 'Эрүүл мэндийн үзлэг',
    description: 'Өнөө 7 хоногт үнэгүй цусны даралт хэмжих боломжтой',
    startDate: now, endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[4]._id,
    type: 'news', title: 'Эмийн сан шинэчлэлт',
    description: 'Эрдэнэт эмийн сан шинэчлэгдэж нээлтээ хийлээ',
    startDate: now, endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[5]._id, productId: products[10]._id,
    type: 'promo', title: 'Хүүхдийн эмэнд хямдрал',
    description: 'Нурофен сироп 10% хямдралтай энэ сард',
    startDate: now, endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[6]._id,
    type: 'news', title: 'Гранд Эмийн Сан нээлттэй',
    description: 'Шинэ байршилд нүүж ирлээ. Таны ойролцоо!',
    startDate: now, endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    pharmacyId: pharmacies[7]._id, productId: products[8]._id,
    type: 'promo', title: 'Но-Шпа урамшуулал',
    description: '3 хайрцаг авбал 10% хямдрал авна',
    startDate: now, endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
  },
]);
console.log(`Inserted ${ads.length} ads`);

const discounts = await Discount.insertMany([
  { productId: products[0]._id, pharmacyId: pharmacies[0]._id, percentage: 20, startDate: now, endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
  { productId: products[1]._id, pharmacyId: pharmacies[0]._id, percentage: 10, startDate: now, endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) },
  { productId: products[3]._id, pharmacyId: pharmacies[1]._id, percentage: 33, startDate: now, endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) },
  { productId: products[4]._id, pharmacyId: pharmacies[2]._id, percentage: 15, startDate: now, endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000) },
  { productId: products[6]._id, pharmacyId: pharmacies[3]._id, percentage: 25, startDate: now, endDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000) },
  { productId: products[7]._id, pharmacyId: pharmacies[3]._id, percentage: 12, startDate: now, endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000) },
  { productId: products[8]._id, pharmacyId: pharmacies[7]._id, percentage: 10, startDate: now, endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000) },
  { productId: products[10]._id, pharmacyId: pharmacies[5]._id, percentage: 10, startDate: now, endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) },
  { productId: products[11]._id, pharmacyId: pharmacies[5]._id, percentage: 18, startDate: now, endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
  { productId: products[12]._id, pharmacyId: pharmacies[6]._id, percentage: 20, startDate: now, endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) },
  { productId: products[2]._id, pharmacyId: pharmacies[1]._id, percentage: 8, startDate: now, endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) },
]);
console.log(`Inserted ${discounts.length} discounts`);
console.log(`\nSeed complete! Users: ${users.length}, Pharmacies: ${pharmacies.length}, Products: ${products.length}, Ads: ${ads.length}, Discounts: ${discounts.length}`);

await mongoose.disconnect();
