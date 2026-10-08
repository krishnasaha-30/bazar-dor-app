const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Convert any Bengali digits inside a string to western digits. */
export function bnToEn(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/** Parse numbers such as 148, "১৪৮", "১,৮৫০ টাকা", "-২.১%" into a real number. */
export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  if (typeof value !== "string") return fallback;
  const cleaned = bnToEn(value).replace(/,/g, "").replace(/[^\d.+-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : fallback;
}

const numberFmt = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });

/** 1850 -> ১,৮৫০ */
export function formatBn(n: number): string {
  return numberFmt.format(n);
}

export function formatPrice(n: number): string {
  return `${formatBn(n)} টাকা`;
}

export function formatUnit(unit: string): string {
  const trimmed = unit.trim();
  if (!trimmed) return "";

  const lower = trimmed.toLowerCase();
  if (lower.startsWith("প্রতি")) return trimmed;

  const map: Record<string, string> = {
    kg: "কেজি",
    kgs: "কেজি",
    kilo: "কেজি",
    kilogram: "কেজি",
    l: "লিটার",
    litre: "লিটার",
    liter: "লিটার",
    liters: "লিটার",
    dozen: "ডজন",
    pcs: "পিস",
    pc: "পিস",
    piece: "পিস",
    pieces: "পিস",
    packet: "প্যাকেট",
    box: "বক্স",
    bottle: "বোটল",
  };

  const mapped = map[lower] ?? trimmed;
  return `প্রতি ${mapped}`;
}

/** 2.1 -> ▲ ২.১% | -2.9 -> ▼ ২.৯% | 0 -> —০.০% */
export function formatChange(percent: number): string {
  const abs = formatBn(Math.abs(percent));
  if (percent > 0) return `▲ ${abs}%`;
  if (percent < 0) return `▼ ${abs}%`;
  return `— ০.০%`;
}

export function banglaDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
