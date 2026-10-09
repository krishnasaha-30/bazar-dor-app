export function getSafeReturnTo(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  try {
    const destination = new URL(value, "http://localhost");
    return destination.origin === "http://localhost" ? value : "/";
  } catch {
    return "/";
  }
}
