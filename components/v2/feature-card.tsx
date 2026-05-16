import { Seal } from "./seal";

type Props = {
  bg: string;
  ink?: string;
  sealColor: string;
  sealIcon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  bg,
  ink = "#0c1a18",
  sealColor,
  sealIcon,
  title,
  description,
  className,
}: Props) {
  return (
    <div
      className={`v2-card-outline relative flex h-full min-h-[280px] flex-col justify-end rounded-3xl p-6 sm:p-8 ${className ?? ""}`}
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="absolute left-1/2 top-6 -translate-x-1/2 sm:top-8">
        <Seal color={sealColor} size={56}>
          <div className="text-[#0c1a18]">{sealIcon}</div>
        </Seal>
      </div>
      <div className="mt-auto text-center">
        <h3 className="v2-display-tight text-2xl sm:text-[28px]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed opacity-80">{description}</p>
      </div>
    </div>
  );
}
