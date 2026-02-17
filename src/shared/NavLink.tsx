import Link from 'next/link';
import { ReactNode } from 'react';

export const NavLink = ({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};
