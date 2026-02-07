import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Search } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Suppliers', path: '/suppliers', icon: Users },
        { name: 'Products', path: '/products', icon: Package },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        GreenTrade
                    </Link>

                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    'flex items-center space-x-2 text-sm font-medium transition-colors duration-200',
                                    location.pathname === item.path
                                        ? 'text-emerald-600'
                                        : 'text-gray-500 hover:text-emerald-500'
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none w-64"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
