import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics NAV 2017',
  subtitle: 'NAV 2017 services for stable business continuity',
  category: 'solution',
  focus: 'NAV 2017 operations, customization, reporting, support, and migration preparation',
  summary:
    'Support Microsoft Dynamics NAV 2017 with environment reviews, process improvements, reporting updates, and planning that keeps the business moving.',
  image: '/assets/img/service/BusinessCentral.svg',
  highlights: [
    'NAV 2017 process and environment review',
    'Customization and reporting enhancements',
    'Support for daily operations and users',
    'Migration readiness and upgrade roadmap'
  ]
};

export { pageConfig };

export default function DynamicsNav2017() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

