import { kebabCase } from 'lodash';
import type { ReactNode } from 'react';
import Widget from './Widget';

interface Props {
  children: ReactNode;
  name?: string;
}

const Section = ({ children, name = '' }: Props) => {
  const kebabName = kebabCase(name);

  return (
    <section aria-labelledby={kebabName}>
      <h2 className="sr-only" id={kebabName}>
        {name}
      </h2>
      <Widget>{children}</Widget>
    </section>
  );
};

export default Section;
