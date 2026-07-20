import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Power Platform',
  subtitle: 'Low-code apps and automation governed for scale',
  category: 'solution',
  focus: 'Power Apps, Power Automate, Power BI integration, Dataverse, governance, and adoption',
  summary:
    'Use Microsoft Power Platform to build useful apps, automate repeated work, connect data, and manage growth with the right governance and support model.',
  image: '/assets/img/service/PowerPlatform.svg',
  highlights: [
    'Power Apps for practical business workflows',
    'Power Automate approvals and process automation',
    'Dataverse, Power BI, and system integration',
    'Governance, adoption, and environment management'
  ]
};

export { pageConfig };

export default function MicrosoftPowerPlatform() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

