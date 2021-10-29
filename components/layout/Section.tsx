interface Props {
  children: ReactNode;
  className?: string;
  name?: string;
}

const Section = ({ children, className, name = '' }: Props) => {
  return (
    <section className={className} aria-labelledby={name}>
      <h1 className="sr-only">{name}</h1>
      {children}
    </section>
  );
};

export default Section;
