const Section = ({
  children,
  className,
}: {
  children: React.ReactElement;
  className?: string;
}) => {
  return (
    <section className={`space-y-10 relative ${className ?? ""}`}>
      {children}
    </section>
  );
};

export default Section;
