import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Field Service',
  subtitle: 'Field service operations with smarter scheduling and support',
  category: 'solution',
  focus: 'work orders, scheduling, mobile service, asset history, dispatch, and service reporting',
  summary:
    'Improve field service delivery by connecting work orders, resources, assets, technicians, customers, and service performance in one operational flow.',
  image: '/assets/img/service/Support-management.png',
  highlights: [
    'Work order and dispatch process setup',
    'Resource scheduling and mobile technician enablement',
    'Asset, warranty, and service history visibility',
    'SLA reporting and service optimization'
  ]
};

export { pageConfig };

export default function D365FieldService() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

