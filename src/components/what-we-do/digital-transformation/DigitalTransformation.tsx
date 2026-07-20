import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Digital Transformation',
  subtitle: 'Digital change programs with practical business momentum',
  category: 'service',
  focus: 'modernization roadmaps, process redesign, automation, data readiness, and change adoption',
  summary:
    'Move from scattered digital initiatives to a focused transformation roadmap that connects technology choices with measurable process and adoption outcomes.',
  image: '/assets/img/service/ArtificalIntelligence.png',
  highlights: [
    'Transformation roadmap and priority planning',
    'Process redesign and automation opportunities',
    'Cloud, data, and platform modernization',
    'Change enablement and adoption tracking'
  ]
};

export { pageConfig };

export default function DigitalTransformation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
