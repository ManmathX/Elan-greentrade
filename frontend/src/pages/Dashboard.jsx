import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import api from '../services/api';
import { Users, Package } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/analytics/summary');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    if (!data) return <div className="text-center text-red-500">Failed to load data. Please ensure backend is running.</div>;

    const categoryChartData = {
        labels: data.productsByCategory.map(item => item._id),
        datasets: [
            {
                label: 'Products',
                data: data.productsByCategory.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const certificationChartData = {
        labels: data.productsByCertification.map(item => item._id),
        datasets: [
            {
                label: 'Number of Products',
                data: data.productsByCertification.map(item => item.count),
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:scale-105 duration-200">
                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                        <Users size={32} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Suppliers</p>
                        <p className="text-2xl font-bold text-gray-800">{data.totalSuppliers}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:scale-105 duration-200">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <Package size={32} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <p className="text-2xl font-bold text-gray-800">{data.totalProducts}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Products by Category</h2>
                    <div className="h-64 flex justify-center relative">
                        <Doughnut data={categoryChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Product Certification Status</h2>
                    <div className="h-64 relative">
                        <Bar data={certificationChartData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
