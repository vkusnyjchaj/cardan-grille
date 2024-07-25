import React from 'react';

type SectionProps = {
  title: string;
  className?: string;
};

export default function Section(props: React.PropsWithChildren<SectionProps>) {
  return (
    <section className={props.className}>
      <h2>{props.title}</h2>
      <div>{props.children}</div>
    </section>
  );
}
