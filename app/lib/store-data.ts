import type { Product, ProductOption } from '@salla.sa/twilight-theme-engine/types';

/**
 * Shared helpers that bridge Salla store data (products + theme components)
 * into the DT. SHAHAD UI. There is intentionally no second product database
 * in the theme — everything here is derived from Salla product API responses
 * so the store owner can change products, prices and images from the Salla
 * dashboard without touching code.
 */

export interface StoreProductOption {
  id: number;
  name: string;
  required: boolean;
  values: Array<{ id: number; name: string; price?: number; is_selected?: boolean }>;
}

export interface PackageView {
  id: string;
  name: string;
  description: string;
  image: string | null;
  url: string | null;
  price: number;
  salePrice: number | null;
  duration: string | null;
  benefits: string[];
  includes: string[];
  options: StoreProductOption[];
  available: boolean;
  recommended: boolean;
}

export function normalizeProductId(id: string | number): string {
  return String(id).trim();
}

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);
}

const DURATION_OPTION_RE = /مدة|المدة|duration|period|اشتراك/i;

function extractDuration(options: ProductOption[]): string | null {
  const group = options.find((option) => DURATION_OPTION_RE.test(option.name));
  const first = group?.values?.[0];
  return first?.name ? first.name : null;
}

function splitDescription(
  description: string
): { description: string; benefits: string[]; includes: string[] } {
  const text = (description ?? '').trim();
  if (!text) return { description: '', benefits: [], includes: [] };
  const lines = text
    .split(/\n+|•|▪|\*/)
    .map((line) => line.trim())
    .filter(Boolean);
  return {
    description: lines[0],
    benefits: lines.slice(1, 5),
    includes: lines.slice(5, 13),
  };
}

export function toPackageView(product: Product, featuredId?: string | null): PackageView {
  const id = normalizeProductId(product.id);
  const { description, benefits, includes } = splitDescription(product.description);
  const numericPrice = typeof product.price === 'number' ? product.price : Number(product.price);
  const options: StoreProductOption[] = (product.options ?? []).map((option) => ({
    id: option.id,
    name: option.name,
    required: option.required,
    values: (option.values ?? []).map((value) => ({
      id: value.id,
      name: value.name,
      price: value.price,
      is_selected: value.is_selected,
    })),
  }));
  const available =
    product.status === 'sale' && product.is_available && !product.is_out_of_stock;

  return {
    id,
    name: product.name,
    description: description || 'خطة غذائية شخصية مصممة لتناسب أهدافك',
    image: product.image?.url ?? null,
    url: product.url ?? null,
    price: numericPrice,
    salePrice: product.is_on_sale && product.sale_price > 0 ? product.sale_price : null,
    duration: extractDuration(product.options ?? []),
    benefits,
    includes,
    options,
    available,
    recommended: Boolean(featuredId) && featuredId === id,
  };
}

export function getHomeComponent(
  components: unknown[],
  path: string
): Record<string, unknown> | undefined {
  const list = Array.isArray(components) ? components : [];
  return list.find(
    (item): item is Record<string, unknown> =>
      typeof item === 'object' && item !== null && (item as { path?: unknown }).path === path
  );
}

export function extractProductIds(
  values: Record<string, unknown> | undefined,
  field: string
): string[] {
  const raw = values?.[field];
  if (!Array.isArray(raw)) return [];
  const ids: string[] = [];
  for (const entry of raw) {
    if (typeof entry === 'object' && entry !== null) {
      const id = (entry as { id?: string | number }).id;
      if (id !== undefined && id !== null) ids.push(normalizeProductId(id));
    } else if (typeof entry === 'string' || typeof entry === 'number') {
      ids.push(normalizeProductId(entry));
    }
  }
  return ids;
}

export function extractSingleProductId(
  values: Record<string, unknown> | undefined,
  field: string
): string | null {
  const raw = values?.[field];
  if (Array.isArray(raw)) return extractProductIds(values, field)[0] ?? null;
  if (typeof raw === 'object' && raw !== null) {
    const id = (raw as { id?: string | number }).id;
    return id !== undefined && id !== null ? normalizeProductId(id) : null;
  }
  if (typeof raw === 'string' || typeof raw === 'number') return normalizeProductId(raw);
  return null;
}

export function resolveText(value: unknown, locale: string): string | null {
  if (typeof value === 'string' && value.trim()) return value;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const hit = record[locale] ?? record.ar ?? record.en;
    if (typeof hit === 'string' && hit.trim()) return hit;
  }
  return null;
}