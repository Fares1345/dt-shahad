import { createFileRoute } from '@tanstack/react-router';
import { home as homeApi } from '@salla.sa/twilight-theme-engine/api/home';
import { product as productApi } from '@salla.sa/twilight-theme-engine/api/product';
import { DtHomeContent } from '../components/home/DtHomeContent';
import {
  extractProductIds,
  extractSingleProductId,
  getHomeComponent,
  normalizeProductId,
  toPackageView,
  type PackageView,
} from '../lib/store-data';
import type { Product } from '@salla.sa/twilight-theme-engine/types';

export const Route = createFileRoute('/{-$locale}/')({
  component: HomeComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;

    const rawComponents = await queryClient.ensureQueryData(homeApi.queries.components());
    const components = Array.isArray(rawComponents)
      ? rawComponents
      : Array.isArray((rawComponents as { data?: unknown[] })?.data)
        ? (rawComponents as { data: unknown[] }).data
        : [];
    const heroCfg = getHomeComponent(components, 'home.dt-hero');
    const packagesCfg = getHomeComponent(components, 'home.dt-packages');

    const products = await queryClient.ensureQueryData(
      productApi.queries.list({ source: 'latest', perPage: 20 })
    );
    const all: Product[] = products.items ?? [];

    const configuredIds = extractProductIds(packagesCfg, 'products');
    const featuredId = extractSingleProductId(packagesCfg, 'featured');

    // Editor-configured products are fetched directly by ID (Salla's "selected"
    // source) so a package is always resolved even if it is not among the latest
    // products. The latest list is still fetched for the store-products counter.
    const configuredNumericIds = configuredIds
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id));

    const selected = configuredNumericIds.length
      ? (await queryClient.ensureQueryData(
          productApi.queries.list({ source: 'selected', sourceValue: configuredNumericIds })
        )).items ?? []
      : [];

    let ordered: Product[] = [];
    if (configuredIds.length) {
      ordered = configuredIds
        .map((id) => selected.find((product) => normalizeProductId(product.id) === id))
        .filter((product): product is Product => Boolean(product));
    }
    if (!ordered.length) ordered = all.slice(0, 4);

    return {
      heroCfg,
      packagesCfg,
      packages: ordered.map((product) => toPackageView(product, featuredId)),
      productsCount: all.length,
    };
  },
});

interface HomeData {
  heroCfg?: Record<string, unknown>;
  packagesCfg?: Record<string, unknown>;
  packages: PackageView[];
  productsCount: number;
}

function HomeComponent() {
  const data = Route.useLoaderData() as HomeData;
  return <DtHomeContent {...data} />;
}