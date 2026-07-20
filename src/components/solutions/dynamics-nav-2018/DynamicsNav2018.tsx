import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics NAV 2018',
  subtitle: 'NAV 2018 optimization and future-ready planning',
  category: 'solution',
  focus: 'NAV 2018 support, workflows, reporting, integrations, and Business Central transition planning',
  summary:
    'Get more value from Dynamics NAV 2018 through support, workflow refinement, report improvements, integration fixes, and structured modernization planning.',
  image: '/assets/img/service/Business Central.avif',
  highlights: [
    'NAV 2018 stabilization and support',
    'Workflow and integration improvements',
    'Reporting visibility and user enablement',
    'Business Central transition planning'
  ]
};

export { pageConfig };

export default function DynamicsNav2018() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

