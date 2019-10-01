export function makeUrl(base: URL, path: string, params: Record<string, any > = {}) {
  const url = new URL(path, base);

  url.search = new URLSearchParams(params as any).toString();
  return url.toString();
}
