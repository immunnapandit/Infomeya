import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Support & Managed Services',
  subtitle: 'Managed support that keeps business systems dependable',
  category: 'service',
  focus: 'application support, monitoring, issue resolution, enhancements, and service governance',
  summary:
    'Keep platforms stable and useful with managed services that combine responsive support, proactive checks, continuous improvements, and clear ownership.',
  image: '/assets/img/service/whychoose.png',
  highlights: [
    'Service desk and incident management',
    'Environment health monitoring and maintenance',
    'Enhancement backlog and release planning',
    'SLA reporting and governance reviews'
  ]
};

export { pageConfig };

export default function SupportManagedServices() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
