import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Human Resources',
  subtitle: 'Human resources processes with better employee visibility',
  category: 'solution',
  focus: 'employee records, HR workflows, onboarding, performance, leave, and workforce reporting',
  summary:
    'Streamline people operations with HR capabilities that improve employee data quality, service workflows, onboarding, performance tracking, and workforce insight.',
  image: '/assets/img/service/hrms.jpg',
  highlights: [
    'Employee data and HR process setup',
    'Onboarding and lifecycle workflow support',
    'Performance, leave, and policy alignment',
    'Workforce reporting and adoption guidance'
  ]
};

export { pageConfig };

export default function D365Talent() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

