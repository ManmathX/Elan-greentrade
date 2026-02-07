const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    name: { type: String, required: true },
    category: {
        type: String,
        enum: ["Organic Food", "Handmade", "Sustainable Goods"],
        required: true
    },
    price: { type: Number, required: true },
    stock_quantity: { type: Number, required: true },
    certification_status: {
        type: String,
        enum: ["Certified", "Pending", "Not Certified"],
        default: "Pending"
    },
    certification_expiry_date: Date,
    description: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
