type SectionDividerProps = {
  weight?: "thin" | "thick";
};

export function SectionDivider({ weight = "thin" }: SectionDividerProps) {
  const border = weight === "thick" ? "border-t-2" : "border-t";
  return <hr className={`${border} border-charcoal`} />;
}
