export default function Button({ children, variant = 'primary', size = 'md', className = '', icon: Icon, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' };
  const variants = {
    primary: 'bg-navy-600 text-white hover:bg-navy-700 shadow-sm',
    secondary: 'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50',
    accent: 'bg-saffron-600 text-white hover:bg-saffron-700 shadow-sm',
    ghost: 'text-gray-600 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
