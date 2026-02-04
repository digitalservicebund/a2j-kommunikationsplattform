export function KitchensinkWrapper({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="bg-kern-orange-050 p-kern-space-default space-x-kern-space-large rounded-kern-border-radius-default min-h-kern-dimension-5x-large flex items-center overflow-hidden">
        <p className="kern-body kern-body--small kern-body--bold">{label}</p>
      </div>
      <div className="pointer-events-none">{children}</div>
    </section>
  );
}
