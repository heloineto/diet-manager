import type { SVGProps } from 'react';

interface CategoryType {
  name: string;
  label: string;
  IconOutlined: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  IconSolid: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  Form: (props: { className?: string }) => JSX.Element;
}
