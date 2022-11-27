import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import concat from '@/lib/helpers/concat';

const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    className={concat('bg-slate-400 dark:bg-slate-700 bg-opacity-20 rounded-full font-bold text-slate-500 dark:text-white outline-none px-3 py-1 border border-transparent focus:border-slate-300 focus:dark:border-slate-600 transition-colors duration-200 ease-in-out', className)}
    {...props}
    ref={ref}
  />
));

Input.displayName = 'custom-input';

export default Input;