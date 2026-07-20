import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Project Service Automation',
  subtitle: 'Project delivery visibility from estimate to completion',
  category: 'solution',
  focus: 'project planning, resourcing, time capture, billing, profitability, and delivery governance',
  summary:
    'Connect project sales, planning, resource allocation, time tracking, delivery reporting, and financial visibility for more predictable project operations.',
  image: '/assets/img/service/Product-engineering.png',
  highlights: [
    'Project planning and estimate alignment',
    'Resource, time, and expense process setup',
    'Billing, profitability, and delivery visibility',
    'Governance reporting and optimization'
  ]
};

export { pageConfig };

export default function D365ProjectServiceAutomation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

