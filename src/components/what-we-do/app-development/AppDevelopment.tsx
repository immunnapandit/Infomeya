import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'App Development',
  subtitle: 'Custom applications built for real workflows',
  category: 'service',
  focus: 'business apps, portals, workflow tools, integrations, and user experience',
  summary:
    'Design and build applications that simplify work, connect systems, improve usability, and give teams digital tools that match how the business actually operates.',
  image: '/assets/img/service/webdevelopment.svg',
  highlights: [
    'Discovery, UX flows, and solution blueprinting',
    'Custom web and business app development',
    'API, data, and workflow integrations',
    'Release support and product enhancements'
  ]
};

export { pageConfig };

export default function AppDevelopment() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
