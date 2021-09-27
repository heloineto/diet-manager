interface CategoryType {
  name: string;
  label: string;
  IconOutlined: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  IconSolid: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  Form: (props: { className?: string }) => JSX.Element;
}
