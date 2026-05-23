type Props = {
  children: React.ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: Props) {
  return (
    <blockquote className="pull-quote">
      <p>{children}</p>
      {attribution ? <cite>— {attribution}</cite> : null}
    </blockquote>
  );
}
