import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'BI & Analytics',
  subtitle: 'Insight systems that turn business data into action',
  category: 'service',
  focus: 'KPI planning, data models, dashboards, governance, and decision intelligence',
  summary:
    'Build analytics foundations that help leaders track performance, spot exceptions, compare trends, and act with confidence across departments and business systems.',
  image: '/assets/img/service/power-bi-icon.svg',
  highlights: [
    'KPI framework and metric ownership',
    'Power BI dashboards and analytics delivery',
    'Trusted data models and quality checks',
    'Governed reporting for faster decisions'
  ]
};

export { pageConfig };

export default function BiAnalytics() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
