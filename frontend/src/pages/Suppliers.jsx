import { useEffect, useState } from 'react';
import { Plus, Search, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import api from '../services/api';
import AddSupplierModal from '../components/AddSupplierModal';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSuppliers = async () => {
        try {
            const response = await api.get('/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Suppliers</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>Add Supplier</span>
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSuppliers.map((supplier) => (
                    <div key={supplier._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{supplier.name}</h3>
                                <p className="text-sm text-gray-500">{supplier.contact_person}</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                                <ChevronRight size={20} className="text-gray-400 group-hover:text-emerald-500" />
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Mail size={16} className="text-gray-400" />
                                <span>{supplier.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={16} className="text-gray-400" />
                                <span>{supplier.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-gray-400" />
                                <span>{supplier.country || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredSuppliers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No suppliers found.
                    </div>
                )}
            </div>

            <AddSupplierModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchSuppliers}
            />
        </div>
    );
};

export default Suppliers;
