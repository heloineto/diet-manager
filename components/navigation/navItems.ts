import {
  BookOpenIcon,
  CogIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/outline';

const navItems = [
  { name: 'home', label: 'Home', Icon: HomeIcon, href: '/' },
  { name: 'diary', label: 'Diário', Icon: BookOpenIcon, href: '/diary' },
  { name: 'settings', label: 'Preferências', Icon: CogIcon, href: '/settings' },
  // { name: 'profile', label: 'Perfil', Icon: UsersIcon, href: '/diary' },
];

export default navItems;
