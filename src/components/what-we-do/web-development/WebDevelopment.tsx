import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Web Development',
  subtitle: 'Web experiences engineered for performance and growth',
  category: 'service',
  focus: 'websites, portals, front-end engineering, CMS integration, performance, and maintenance',
  summary:
    'Create fast, secure, and maintainable web experiences that present your brand clearly, support business workflows, and scale with future content and functionality.',
  image: '/assets/img/service/App-development.png',
  highlights: [
    'Website and portal planning',
    'Responsive UI development and integration',
    'Performance, accessibility, and SEO readiness',
    'Maintenance, enhancements, and support'
  ]
};

export { pageConfig };

export default function WebDevelopment() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
