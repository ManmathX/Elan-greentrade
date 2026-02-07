import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                ref={ref}
                className={clsx(
                    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none",
                    error ? "border-red-500" : "border-gray-300",
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
