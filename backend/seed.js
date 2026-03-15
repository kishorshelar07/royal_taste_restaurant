/**
 * Seed Script — Run once to populate MongoDB
 * Usage: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Menu = require('./models/Menu');

const menuItems = [
  // STARTERS
  { name: 'Paneer Tikka', category: 'starters', description: 'Marinated cottage cheese cubes grilled in a tandoor with spices and bell peppers.', price: 280, isVeg: true, isSpecial: true, spiceLevel: 'medium', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80', tags: ['popular', 'tandoor'] },
  { name: 'Crispy Veg Spring Rolls', category: 'starters', description: 'Golden fried rolls stuffed with seasoned vegetables and glass noodles.', price: 220, isVeg: true, isSpecial: false, spiceLevel: 'mild', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80', tags: ['crispy'] },
  { name: 'Chicken Seekh Kebab', category: 'starters', description: 'Minced chicken mixed with herbs on skewers, char-grilled to perfection.', price: 320, isVeg: false, isSpecial: false, spiceLevel: 'hot', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', tags: ['grilled', 'protein'] },
  { name: 'Hara Bhara Kebab', category: 'starters', description: 'Spinach and pea patties spiced with herbs, shallow fried until golden.', price: 240, isVeg: true, isSpecial: false, spiceLevel: 'mild', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', tags: ['healthy', 'green'] },

  // MAIN COURSE
  { name: 'Butter Chicken', category: 'main-course', description: "Tender chicken in a rich, creamy tomato-butter gravy — India's most loved dish.", price: 380, isVeg: false, isSpecial: true, spiceLevel: 'medium', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80', tags: ['bestseller', 'creamy'] },
  { name: 'Dal Makhani', category: 'main-course', description: 'Slow-cooked black lentils in butter and cream, a North Indian classic.', price: 280, isVeg: true, isSpecial: false, spiceLevel: 'mild', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80', tags: ['lentils', 'comfort'] },
  { name: 'Hyderabadi Biryani', category: 'main-course', description: 'Fragrant basmati rice layered with spiced meat, saffron and caramelised onions.', price: 420, isVeg: false, isSpecial: true, spiceLevel: 'hot', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&q=80', tags: ['rice', 'saffron', 'bestseller'] },
  { name: 'Palak Paneer', category: 'main-course', description: 'Fresh cottage cheese cubes in a velvety spinach gravy with aromatic spices.', price: 300, isVeg: true, isSpecial: false, spiceLevel: 'medium', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', tags: ['healthy', 'spinach'] },
  { name: 'Mutton Rogan Josh', category: 'main-course', description: 'Slow-braised mutton in a rich Kashmiri spice gravy, fragrant and bold.', price: 480, isVeg: false, isSpecial: true, spiceLevel: 'hot', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80', tags: ['kashmiri', 'slow-cooked'] },

  // CHINESE
  { name: 'Hakka Noodles', category: 'chinese', description: 'Stir-fried noodles with vegetables and sauces, authentic Indo-Chinese style.', price: 260, isVeg: true, isSpecial: false, spiceLevel: 'medium', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80', tags: ['stir-fried'] },
  { name: 'Chilli Chicken', category: 'chinese', description: 'Crispy fried chicken tossed in a fiery, tangy Chinese sauce with peppers.', price: 350, isVeg: false, isSpecial: true, spiceLevel: 'hot', image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600&q=80', tags: ['spicy', 'crispy'] },
  { name: 'Dim Sum Platter', category: 'chinese', description: 'A selection of steamed and fried dumplings with three dipping sauces.', price: 320, isVeg: true, isSpecial: false, spiceLevel: 'mild', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80', tags: ['steamed', 'dumplings'] },
  { name: 'Kung Pao Tofu', category: 'chinese', description: 'Crispy tofu wok-tossed with peanuts, dried chillies and sweet-tangy Kung Pao sauce.', price: 290, isVeg: true, isSpecial: false, spiceLevel: 'hot', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80', tags: ['tofu', 'wok'] },

  // FAST FOOD
  { name: 'Royal Signature Burger', category: 'fastfood', description: 'Double-patty burger with cheese, bacon, special sauce and fresh vegetables.', price: 290, isVeg: false, isSpecial: true, spiceLevel: 'mild', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', tags: ['cheese', 'double-patty'] },
  { name: 'Loaded Cheese Fries', category: 'fastfood', description: 'Crispy fries topped with nacho cheese, jalapeños and sour cream.', price: 180, isVeg: true, isSpecial: false, spiceLevel: 'medium', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80', tags: ['fries', 'cheese'] },
  { name: 'Chicken Wrap', category: 'fastfood', description: 'Grilled chicken, fresh veggies and house sauce wrapped in a warm tortilla.', price: 250, isVeg: false, isSpecial: false, spiceLevel: 'mild', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', tags: ['wrap', 'grilled'] },

  // DESSERTS
  { name: 'Gulab Jamun', category: 'desserts', description: 'Soft milk-solid dumplings soaked in rose-flavoured sugar syrup, served warm.', price: 150, isVeg: true, isSpecial: false, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1564670369-98c8b2f76b67?w=600&q=80', tags: ['sweet', 'traditional'] },
  { name: 'Chocolate Lava Cake', category: 'desserts', description: 'Warm chocolate cake with a flowing molten chocolate centre, served with vanilla ice cream.', price: 220, isVeg: true, isSpecial: true, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', tags: ['chocolate', 'warm'] },
  { name: 'Rasmalai', category: 'desserts', description: 'Soft cottage cheese rounds soaked in chilled saffron-cardamom rabri. Dreamily delicate.', price: 180, isVeg: true, isSpecial: false, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80', tags: ['saffron', 'chilled'] },

  // BEVERAGES
  { name: 'Mango Lassi', category: 'beverages', description: 'Chilled yogurt-based mango drink, thick and refreshing with a hint of cardamom.', price: 120, isVeg: true, isSpecial: false, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80', tags: ['mango', 'yogurt'] },
  { name: 'Virgin Mojito', category: 'beverages', description: 'Fresh mint, lime, and soda water — the perfect refreshing mocktail.', price: 140, isVeg: true, isSpecial: false, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=600&q=80', tags: ['mint', 'mocktail'] },
  { name: 'Masala Chai', category: 'beverages', description: 'Aromatic Indian spiced tea with ginger, cardamom, and fresh milk.', price: 80, isVeg: true, isSpecial: false, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80', tags: ['tea', 'spiced'] },
  { name: 'Cold Coffee Frappe', category: 'beverages', description: 'Blended espresso with milk, ice cream and chocolate drizzle.', price: 160, isVeg: true, isSpecial: true, spiceLevel: 'none', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', tags: ['coffee', 'cold'] },
];

async function seed() {
  await connectDB();

  // Clear existing
  await Admin.deleteMany();
  await Menu.deleteMany();

  // Create admin
  await Admin.create({ username: 'admin', email: 'admin@royaltaste.com', password: 'admin123' });
  console.log('✅ Admin created — username: admin / password: admin123');

  // Create menu items
  await Menu.insertMany(menuItems);
  console.log(`✅ ${menuItems.length} menu items seeded`);

  console.log('🎉 Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
