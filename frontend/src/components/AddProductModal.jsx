import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import api from '../services/api';
import Input from './Input';
import Select from './Select';
import { useState, useEffect } from 'react';

const AddProductModal = ({ isOpen, onClose, onSuccess, productToEdit }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await api.get('/suppliers');
                setSuppliers(response.data.map(s => ({ value: s._id, label: s.name })));
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        if (isOpen) fetchSuppliers();
    }, [isOpen]);

    useEffect(() => {
        if (productToEdit) {
            setValue('name', productToEdit.name);
            setValue('category', productToEdit.category);
            setValue('price', productToEdit.price);
            setValue('stock_quantity', productToEdit.stock_quantity);
            setValue('certification_status', productToEdit.certification_status);
            setValue('supplier_id', productToEdit.supplier_id?._id || productToEdit.supplier_id);
            setValue('description', productToEdit.description);
        } else {
            reset();
        }
    }, [productToEdit, setValue, reset, isOpen]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        try {
            if (productToEdit) {
                await api.put(`/products/${productToEdit._id}`, data);
            } else {
                await api.post('/products', data);
            }
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            setServerError(error.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-gray-800">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>

                {serverError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Name"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name}
                    />

                    <Select
                        label="Supplier"
                        options={suppliers}
                        placeholder="Select Supplier"
                        {...register('supplier_id', { required: 'Supplier is required' })}
                        error={errors.supplier_id}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Category"
                            options={[
                                { value: 'Organic Food', label: 'Organic Food' },
                                { value: 'Handmade', label: 'Handmade' },
                                { value: 'Sustainable Goods', label: 'Sustainable Goods' },
                            ]}
                            placeholder="Select Category"
                            {...register('category', { required: 'Category is required' })}
                            error={errors.category}
                        />
                        <Select
                            label="Certification"
                            options={[
                                { value: 'Certified', label: 'Certified' },
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Not Certified', label: 'Not Certified' },
                            ]}
                            placeholder="Select Status"
                            {...register('certification_status')}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Price"
                            type="number"
                            step="0.01"
                            {...register('price', { required: 'Price is required', min: 0 })}
                            error={errors.price}
                        />
                        <Input
                            label="Stock"
                            type="number"
                            {...register('stock_quantity', { required: 'Stock is required', min: 0 })}
                            error={errors.stock_quantity}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                            rows="3"
                            {...register('description')}
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
