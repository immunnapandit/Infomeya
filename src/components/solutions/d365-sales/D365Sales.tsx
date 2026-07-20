import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Sales',
  subtitle: 'Sales execution powered by connected customer intelligence',
  category: 'solution',
  focus: 'lead management, opportunity tracking, forecasting, pipeline reporting, and sales adoption',
  summary:
    'Help sales teams focus on the right opportunities with Dynamics 365 Sales processes that improve pipeline visibility, follow-up discipline, and forecasting confidence.',
  image: '/assets/img/service/CRM.png',
  highlights: [
    'Lead-to-opportunity process design',
    'Pipeline, forecasting, and activity tracking',
    'Sales automation and customer data quality',
    'Dashboards, coaching, and adoption support'
  ]
};

export { pageConfig };

export default function D365Sales() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

