import {
  BookOpenIcon as BookOpenIconOutlined,
  CogIcon as CogIconOutlined,
  HomeIcon as HomeIconOutlined,
  UsersIcon as UsersIconOutlined,
} from '@heroicons/react/outline';

import {
  BookOpenIcon as BookOpenIconSolid,
  CogIcon as CogIconSolid,
  HomeIcon as HomeIconSolid,
  UsersIcon as UsersIconSolid,
} from '@heroicons/react/solid';

const navItems = [
  {
    name: 'home',
    label: 'Home',
    IconOutlined: HomeIconOutlined,
    IconSolid: HomeIconSolid,
    href: '/',
  },
  {
    name: 'diary',
    label: 'Diário',
    IconOutlined: BookOpenIconOutlined,
    IconSolid: BookOpenIconSolid,
    href: '/diary',
  },
  {
    name: 'settings',
    label: 'Preferências',
    IconOutlined: CogIconOutlined,
    IconSolid: CogIconSolid,
    href: '/settings',
  },
];

export default navItems;
