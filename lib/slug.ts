export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);
}

export function vehicleSlug(brand: string, model: string, version: string | null | undefined, year: number) {
  return slugify([brand, model, version, year].filter(Boolean).join(' '));
}
