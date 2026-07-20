import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'CRM Implementation',
  subtitle: 'CRM delivery that strengthens every customer touchpoint',
  category: 'service',
  focus: 'sales pipelines, service operations, marketing journeys, reporting, and adoption',
  summary:
    'Shape CRM around the way teams attract, convert, support, and retain customers with cleaner workflows, useful automation, reliable data, and practical enablement.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'Customer journey and process mapping',
    'Sales and service workflow configuration',
    'Data migration, integration, and reporting',
    'Role-based training and adoption support'
  ]
};

export { pageConfig };

export default function CrmImplementation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
