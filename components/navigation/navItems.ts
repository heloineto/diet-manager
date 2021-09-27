import BarbellIconOutlined from '@components/icons/BarbellIconOutlined';
import BarbellIconSolid from '@components/icons/BarbellIconSolid';
import {
  BookOpenIcon as BookOpenIconOutlined,
  CogIcon as CogIconOutlined,
  HomeIcon as HomeIconOutlined,
} from '@heroicons/react/outline';

import {
  BookOpenIcon as BookOpenIconSolid,
  CogIcon as CogIconSolid,
  HomeIcon as HomeIconSolid,
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
    name: 'workouts',
    label: 'Treinos',
    IconOutlined: BarbellIconOutlined,
    IconSolid: BarbellIconSolid,
    href: '/workouts',
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
