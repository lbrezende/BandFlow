type Props = {
  bg: string;
  inner: string;
  src: string;
  alt: string;
  className?: string;
};

export function PhotoColumn({ bg, inner, src, alt, className }: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-x-3 inset-y-6 sm:inset-x-4 sm:inset-y-10">
        <div
          className="h-full w-full overflow-hidden rounded-full"
          style={{ backgroundColor: inner }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="v2-photo-mask h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
