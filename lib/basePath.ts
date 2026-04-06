export function withBasePath(url: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!basePath) return url;

  // Absolute URLs, fragments, and data URIs shouldn't be rewritten.
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:") || url.startsWith("#")) {
    return url;
  }

  // If it already has the basePath, keep as-is.
  if (url === basePath || url.startsWith(`${basePath}/`)) return url;

  // Root-relative paths should be scoped under basePath.
  if (url.startsWith("/")) return `${basePath}${url}`;

  // Relative paths: prefix with basePath + "/".
  const prefix = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return `${prefix}${url}`;
}

