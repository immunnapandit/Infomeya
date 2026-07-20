import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Product Engineering',
  subtitle: 'Product engineering from idea to scalable release',
  category: 'service',
  focus: 'product discovery, architecture, development, integrations, testing, and iterative improvement',
  summary:
    'Build software products with a disciplined engineering approach that balances user needs, technical quality, delivery speed, and long-term maintainability.',
  image: '/assets/img/service/flow chart.png',
  highlights: [
    'Product discovery and technical planning',
    'Architecture, development, and integrations',
    'Quality engineering and release readiness',
    'Roadmap-led enhancements and support'
  ]
};

export { pageConfig };

export default function ProductEngineering() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
