import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'CRM 2015',
  subtitle: 'CRM 2015 support for dependable customer operations',
  category: 'solution',
  focus: 'CRM 2015 maintenance, workflows, forms, reports, integrations, and upgrade readiness',
  summary:
    'Keep Dynamics CRM 2015 useful with focused support for workflows, customizations, data quality, reporting, integrations, and future upgrade planning.',
  image: '/assets/img/service/service-thumb-2.png',
  highlights: [
    'CRM 2015 environment and process review',
    'Workflow, form, and report improvements',
    'Issue resolution and integration support',
    'Upgrade readiness and migration planning'
  ]
};

export { pageConfig };

export default function Crm2015() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

