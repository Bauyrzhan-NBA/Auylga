export function resolveImageUrl(imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  if (imagePath.startsWith('/uploads/') || imagePath.startsWith('/api/')) {
    const apiBase = process.env.REACT_APP_API_URL || '';
    const origin = apiBase.replace(/\/api\/?$/, '');
    if (origin) return `${origin}${imagePath}`;
  }

  return imagePath;
}
