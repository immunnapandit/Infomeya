import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Customer Insights',
  subtitle: 'Customer data unified into meaningful engagement insight',
  category: 'solution',
  focus: 'customer profiles, segmentation, journey intelligence, analytics, and activation',
  summary:
    'Use Dynamics 365 Customer Insights to combine customer data, understand behavior, segment audiences, and support more relevant engagement decisions.',
  image: '/assets/img/service/AI1.jpg',
  highlights: [
    'Customer data unification and profile strategy',
    'Segmentation and audience intelligence',
    'Journey insights and activation support',
    'Governance, analytics, and improvement planning'
  ]
};

export { pageConfig };

export default function D365CustomerInsights() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

