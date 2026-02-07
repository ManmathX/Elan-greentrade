import clsx from 'clsx';
import { forwardRef } from 'react';

const Select = forwardRef(({ label, error, className, options, placeholder, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <select
                ref={ref}
                className={clsx(
                    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white",
                    error ? "border-red-500" : "border-gray-300",
                    className
                )}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
        </div>
    );
});

Select.displayName = 'Select';
export default Select;
