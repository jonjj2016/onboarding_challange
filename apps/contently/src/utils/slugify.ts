export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars (keep hyphens)
    .replace(/[\s_]+/g, '-') // spaces and underscores → hyphens
    .replace(/^-+|-+$/g, ''); // strip leading/trailing hyphens
}
