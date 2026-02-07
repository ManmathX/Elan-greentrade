const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

exports.getAnalytics = async (req, res) => {
    try {
        const totalSuppliers = await Supplier.countDocuments();
        const totalProducts = await Product.countDocuments();

        const productsByCategory = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        const productsByCertification = await Product.aggregate([
            { $group: { _id: "$certification_status", count: { $sum: 1 } } }
        ]);

        res.json({
            totalSuppliers,
            totalProducts,
            productsByCategory,
            productsByCertification
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
