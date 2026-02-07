import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Tag, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import api from '../services/api';
import AddProductModal from '../components/AddProductModal';
import Select from '../components/Select';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        certification_status: '',
        search: '',
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.certification_status) params.certification_status = filters.certification_status;
            if (filters.search) params.search = filters.search;

            const response = await api.get('/products', { params });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300); // Debounce search
        return () => clearTimeout(timeoutId);
    }, [filters]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Certified': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'Pending': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'Not Certified': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm w-full md:w-auto justify-center"
                >
                    <Plus size={20} />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                <Select
                    placeholder="All Categories"
                    options={[
                        { value: 'Organic Food', label: 'Organic Food' },
                        { value: 'Handmade', label: 'Handmade' },
                        { value: 'Sustainable Goods', label: 'Sustainable Goods' },
                    ]}
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="bg-gray-50"
                />

                <Select
                    placeholder="All Statuses"
                    options={[
                        { value: 'Certified', label: 'Certified' },
                        { value: 'Pending', label: 'Pending' },
                        { value: 'Not Certified', label: 'Not Certified' },
                    ]}
                    value={filters.certification_status}
                    onChange={(e) => setFilters({ ...filters, certification_status: e.target.value })}
                    className="bg-gray-50"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.certification_status)}`}>
                                        {product.certification_status}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-blue-500 transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{product.supplier_id?.name || 'Unknown Supplier'}</p>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                            </div>

                            <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Price</span>
                                    <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400">Stock</span>
                                    <span className="text-sm font-medium text-gray-700">{product.stock_quantity} units</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {products.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No products found matching your filters.
                        </div>
                    )}
                </div>
            )}

            <AddProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={fetchProducts}
                productToEdit={productToEdit}
            />
        </div>
    );
};

export default Products;
