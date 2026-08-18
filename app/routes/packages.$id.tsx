import { createFileRoute, redirect } from '@tanstack/react-router';
import { product as productApi } from '@salla.sa/twilight-theme-engine/api/product';
import { PackageDetailContent } from '../components/packages/PackageDetailContent';
import { normalizeProductId, toPackageView } from '../lib/store-data';
import type { Product } from '@salla.sa/twilight-theme-engine/types';

export const Route = createFileRoute('/{-$locale}/packages/$id')({
  loader: async ({ context, params }) => {
    const queryClient = context.queryClient;

    let product: Product;
    try {
      product = await queryClient.ensureQueryData(productApi.queries.detail(params.id));
    } catch {
      throw redirect({ to: '/' });
    }
    if (!product) throw redirect({ to: '/' });

    const related = await queryClient.ensureQueryData(
      productApi.queries.list({ source: 'latest', perPage: 6 })
    );
    const others = (related.items ?? [])
      .filter((item) => normalizeProductId(item.id) !== normalizeProductId(product.id))
      .slice(0, 3);

    return {
      product: toPackageView(product),
      related: others.map((item) => toPackageView(item)),
    };
  },
  component: PackageDetailComponent,
});

function PackageDetailComponent() {
  const { product, related } = Route.useLoaderData();
  return <PackageDetailContent product={product} related={related} />;
}