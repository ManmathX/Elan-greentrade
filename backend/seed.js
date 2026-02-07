require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./src/models/Supplier');
const Product = require('./src/models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/greentrade';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        await Supplier.deleteMany({});
        await Product.deleteMany({});

        const suppliers = await Supplier.insertMany([
            { name: 'EcoFarms', email: 'contact@ecofarms.com', country: 'USA', contact_person: 'John Doe', phone: '123-456-7890' },
            { name: 'GreenGoods', email: 'info@greengoods.co.uk', country: 'UK', contact_person: 'Jane Smith', phone: '098-765-4321' },
            { name: 'PureLife', email: 'support@purelife.de', country: 'Germany', contact_person: 'Hans Müller', phone: '111-222-3333' }
        ]);

        const products = await Product.insertMany([
            { supplier_id: suppliers[0]._id, name: 'Organic Apples', category: 'Organic Food', price: 2.5, stock_quantity: 100, certification_status: 'Certified', description: 'Fresh organic apples' },
            { supplier_id: suppliers[0]._id, name: 'Organic Carrots', category: 'Organic Food', price: 1.2, stock_quantity: 200, certification_status: 'Certified', description: 'Crunchy carrots' },
            { supplier_id: suppliers[1]._id, name: 'Bamboo Toothbrush', category: 'Sustainable Goods', price: 5.0, stock_quantity: 500, certification_status: 'Not Certified', description: 'Eco-friendly toothbrush' },
            { supplier_id: suppliers[1]._id, name: 'Recycled Notebook', category: 'Sustainable Goods', price: 3.5, stock_quantity: 150, certification_status: 'Pending', description: 'Made from 100% recycled paper' },
            { supplier_id: suppliers[2]._id, name: 'Handmade Soap', category: 'Handmade', price: 4.0, stock_quantity: 80, certification_status: 'Certified', description: 'Lavender scented soap' },
            { supplier_id: suppliers[2]._id, name: 'Wool Scarf', category: 'Handmade', price: 25.0, stock_quantity: 20, certification_status: 'Not Certified', description: 'Warm wool scarf' }
        ]);

        console.log('Data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
