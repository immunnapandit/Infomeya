import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics AX',
  subtitle: 'Dynamics AX support and modernization with a clear path forward',
  category: 'solution',
  focus: 'AX stabilization, enhancements, reporting, integrations, and migration readiness',
  summary:
    'Keep Microsoft Dynamics AX dependable while improving processes, reporting, integrations, and future-state planning for cloud or Dynamics 365 modernization.',
  image: '/assets/img/service/ERP_H.jpg',
  highlights: [
    'AX environment review and stabilization',
    'Functional enhancements and reporting improvements',
    'Integration support and process optimization',
    'Upgrade assessment and migration roadmap'
  ]
};

export { pageConfig };

export default function MicrosoftDynamicsAx() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

