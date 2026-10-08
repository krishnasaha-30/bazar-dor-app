export default function ChangeBadge({ percent }: { percent: number }) {
  const tone =
    percent > 0
      ? "bg-[#dff6e5] text-[#1f7a3d]"
      : percent < 0
        ? "bg-[#fde7e7] text-[#c73d3d]"
        : "bg-[#ececec] text-[#4b5563]";

  const value = `${Math.abs(percent).toFixed(1)}%`;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-sm font-bold leading-none ${tone}`}
    >
      {value}
    </span>
  );
}
