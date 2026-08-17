import { createFileRoute } from '@tanstack/react-router';
import { AboutContent } from '../components/about/AboutContent';

export const Route = createFileRoute('/{-$locale}/about')({
  component: AboutComponent,
});

function AboutComponent() {
  return <AboutContent />;
}