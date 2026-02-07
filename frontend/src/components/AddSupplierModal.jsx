import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import api from '../services/api';
import Input from './Input';
import { useState } from 'react';

const AddSupplierModal = ({ isOpen, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        try {
            await api.post('/suppliers', data);
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            setServerError(error.response?.data?.message || 'Failed to add supplier');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Supplier</h2>

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
                    <Input
                        label="Email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={errors.email}
                    />
                    <Input
                        label="Country"
                        {...register('country')}
                    />
                    <Input
                        label="Contact Person"
                        {...register('contact_person')}
                    />
                    <Input
                        label="Phone"
                        {...register('phone')}
                    />

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
                            {loading ? 'Adding...' : 'Add Supplier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSupplierModal;
