type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-4 decoration-charcoal hover:decoration-terracotta ${className}`}
    >
      {children} ↗
    </a>
  );
}
