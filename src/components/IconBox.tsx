interface IconBoxProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'blue' | 'purple' | 'cyan';
}

export function IconBox({ icon, size = 'md', variant = 'blue' }: IconBoxProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const variantClasses = {
    blue: 'bg-gradient-to-br from-digiko-primary/20 to-digiko-primary/5',
    purple: 'bg-gradient-to-br from-digiko-accent-secondary/20 to-digiko-accent-secondary/5',
    cyan: 'bg-gradient-to-br from-digiko-accent/20 to-digiko-accent/5'
  };

  const iconColorClasses = {
    blue: 'text-digiko-primary',
    purple: 'text-digiko-accent-secondary',
    cyan: 'text-digiko-accent'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-2xl ${variantClasses[variant]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${iconColorClasses[variant]}`}>
      {icon}
    </div>
  );
}