import type { ReactNode } from 'react';
import { kebabCase } from 'lodash';

interface Props {
  children: ReactNode;
  name?: string;
}

const Section = ({ children, name = '' }: Props) => {
  const kebabName = kebabCase(name);

  return (
    <section aria-labelledby={kebabName}>
      <h1 className="sr-only" id={kebabName}>
        {name}
      </h1>
      {children}
    </section>
  );
};

export default Section;
