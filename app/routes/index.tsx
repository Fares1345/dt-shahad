import { createFileRoute } from '@tanstack/react-router';
import { DtHomeContent } from '../components/home/DtHomeContent';

export const Route = createFileRoute('/{-$locale}/')({
  component: HomeComponent,
});

function HomeComponent() {
  return <DtHomeContent />;
}