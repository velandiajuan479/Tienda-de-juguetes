import React from 'react';
import { icons } from 'lucide-react';

interface CategoryIconProps {
  name: string;
  color?: string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  color,
  className = 'w-5 h-5',
  size
}) => {
  // Lucide React exports an 'icons' object with PascalCase icon names
  const IconComponent = (icons as Record<string, React.ElementType>)[name] || icons.Boxes || icons.Package;

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      className={className}
      size={size}
      style={color ? { color } : undefined}
    />
  );
};
