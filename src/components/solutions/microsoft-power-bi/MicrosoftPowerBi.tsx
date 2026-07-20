import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Power BI',
  subtitle: 'Power BI reporting that makes performance easier to read',
  category: 'solution',
  focus: 'dashboard design, data modeling, KPI tracking, governance, and analytics adoption',
  summary:
    'Turn business data into dashboards and reports people can trust, with the right model, visuals, security, refresh design, and adoption support.',
  image: '/assets/img/service/analytics.png',
  highlights: [
    'Power BI dashboard strategy and UX',
    'Data modeling, refresh, and report development',
    'KPI tracking and leadership-ready insights',
    'Governance, training, and enhancement support'
  ]
};

export { pageConfig };

export default function MicrosoftPowerBi() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
