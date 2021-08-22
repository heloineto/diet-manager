import type { ReactNode } from 'react';
import { kebabCase } from 'lodash';

interface Props {
  children: ReactNode;
  className?: string;
  name?: string;
}

const Section = ({ children, className, name = '' }: Props) => {
  const kebabName = kebabCase(name);

  return (
    <section className={className} aria-labelledby={kebabName}>
      <h1 className="sr-only" id={kebabName}>
        {name}
      </h1>
      {children}
    </section>
  );
};

export default Section;
