import { createFileRoute, redirect } from '@tanstack/react-router';
import { PackageDetailContent } from '../components/packages/PackageDetailContent';
import { getPackageById } from '../lib/packages';

export const Route = createFileRoute('/{-$locale}/packages/$id')({
  loader: ({ params }) => {
    const pkg = getPackageById(params.id);
    if (!pkg) throw redirect({ to: '/' });
    return pkg;
  },
  component: PackageDetailComponent,
});

function PackageDetailComponent() {
  const pkg = Route.useLoaderData();
  return <PackageDetailContent pkg={pkg} />;
}