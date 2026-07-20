import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics CRM',
  subtitle: 'CRM operations refined for stronger customer relationships',
  category: 'solution',
  focus: 'sales, service, workflow automation, legacy CRM support, reporting, and modernization',
  summary:
    'Improve Microsoft Dynamics CRM value with process tuning, workflow updates, reporting improvements, support, and a practical modernization roadmap.',
  image: '/assets/img/service/CRM.png',
  highlights: [
    'CRM process and workflow optimization',
    'Legacy CRM support and enhancements',
    'User adoption and reporting improvements',
    'Modernization planning and delivery support'
  ]
};

export { pageConfig };

export default function MicrosoftDynamicsCrm() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

