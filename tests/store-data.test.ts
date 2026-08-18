import { describe, expect, it } from 'vitest';
import type { Product } from '@salla.sa/twilight-theme-engine/types';
import {
  extractProductIds,
  extractSingleProductId,
  getHomeComponent,
  normalizeProductId,
  resolveText,
  toArabicDigits,
  toPackageView,
} from '../app/lib/store-data';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 12,
    name: 'باقة الأساس',
    description: 'خطة شهرية متكاملة\nوجبات يومية جاهزة\nمتابعة أسبوعية\nتقرير تقدم شهري',
    price: 299,
    sale_price: 0,
    regular_price: 299,
    status: 'sale',
    is_on_sale: false,
    is_available: true,
    is_out_of_stock: false,
    url: '/p/basic',
    image: { url: 'https://cdn.example.com/p.jpg' },
    options: [
      {
        id: 1,
        name: 'المدة',
        type: 'radio',
        required: true,
        values: [
          { id: 11, name: 'شهر واحد', price: 0, is_selected: true },
          { id: 12, name: '٣ أشهر', price: 500, is_selected: false },
        ],
      },
    ],
    ...overrides,
  };
}

describe('toArabicDigits', () => {
  it('converts latin digits to Arabic-Indic digits', () => {
    expect(toArabicDigits(299)).toBe('٢٩٩');
    expect(toArabicDigits('٤ باقات')).toBe('٤ باقات');
  });
});

describe('normalizeProductId', () => {
  it('normalizes numeric and string ids', () => {
    expect(normalizeProductId(12)).toBe('12');
    expect(normalizeProductId(' 7 ')).toBe('7');
  });
});

describe('toPackageView', () => {
  it('maps a sale product with options', () => {
    const view = toPackageView(makeProduct());
    expect(view.id).toBe('12');
    expect(view.name).toBe('باقة الأساس');
    expect(view.price).toBe(299);
    expect(view.salePrice).toBeNull();
    expect(view.duration).toBe('شهر واحد');
    expect(view.benefits).toEqual(['وجبات يومية جاهزة', 'متابعة أسبوعية', 'تقرير تقدم شهري']);
    expect(view.includes).toEqual([]);
    expect(view.image).toBe('https://cdn.example.com/p.jpg');
    expect(view.url).toBe('/p/basic');
    expect(view.available).toBe(true);
    expect(view.recommended).toBe(false);
    expect(view.options[0].values[1]).toMatchObject({ id: 12, name: '٣ أشهر', price: 500 });
  });

  it('uses the sale price when the product is on sale', () => {
    const view = toPackageView(makeProduct({ is_on_sale: true, sale_price: 199 }));
    expect(view.salePrice).toBe(199);
  });

  it('marks the package as recommended when it matches the featured id', () => {
    expect(toPackageView(makeProduct(), '12').recommended).toBe(true);
    expect(toPackageView(makeProduct(), '99').recommended).toBe(false);
  });

  it('marks unavailable products', () => {
    const out = toPackageView(makeProduct({ status: 'out' }));
    expect(out.available).toBe(false);
    const soldOut = toPackageView(makeProduct({ is_out_of_stock: true }));
    expect(soldOut.available).toBe(false);
  });

  it('falls back to a friendly description when empty', () => {
    const view = toPackageView(makeProduct({ description: '' }));
    expect(view.description).toBe('خطة غذائية شخصية مصممة لتناسب أهدافك');
  });

  it('extracts duration from an option group matching المدة', () => {
    const view = toPackageView(
      makeProduct({
        options: [
          { id: 9, name: 'مدة الاشتراك', type: 'radio', required: true, values: [{ id: 91, name: '٦ أشهر' }] },
        ],
      })
    );
    expect(view.duration).toBe('٦ أشهر');
  });
});

describe('getHomeComponent', () => {
  it('finds a component by path and ignores non-objects', () => {
    const components = [null, 'x', { path: 'home.dt-hero', badge: 'أ' }, { path: 'home.dt-packages' }];
    expect(getHomeComponent(components, 'home.dt-hero')).toMatchObject({ badge: 'أ' });
    expect(getHomeComponent(components, 'missing')).toBeUndefined();
    expect(getHomeComponent(undefined, 'home.dt-hero')).toBeUndefined();
  });
});

describe('extractProductIds / extractSingleProductId', () => {
  it('extracts ids from objects, strings and numbers', () => {
    const values = { products: [{ id: 1 }, '2', 3, { id: 4 }] };
    expect(extractProductIds(values, 'products')).toEqual(['1', '2', '3', '4']);
    expect(extractProductIds(undefined, 'products')).toEqual([]);
  });

  it('extracts a single id from various shapes', () => {
    expect(extractSingleProductId({ featured: { id: 7 } }, 'featured')).toBe('7');
    expect(extractSingleProductId({ featured: ['8'] }, 'featured')).toBe('8');
    expect(extractSingleProductId({ featured: '9' }, 'featured')).toBe('9');
    expect(extractSingleProductId({}, 'featured')).toBeNull();
  });
});

describe('resolveText', () => {
  it('resolves plain strings and multilanguage objects', () => {
    expect(resolveText('نص', 'ar')).toBe('نص');
    expect(resolveText({ ar: 'عربي', en: 'English' }, 'ar')).toBe('عربي');
    expect(resolveText({ en: 'English' }, 'ar')).toBe('English');
    expect(resolveText('', 'ar')).toBeNull();
    expect(resolveText(undefined, 'ar')).toBeNull();
  });
});