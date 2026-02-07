const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: String,
    contact_person: String,
    phone: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supplier', supplierSchema);
