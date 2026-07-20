import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics AX 7',
  subtitle: 'Dynamics AX 7 services for stable operations and growth',
  category: 'solution',
  focus: 'AX 7 configuration, support, performance, integrations, and upgrade planning',
  summary:
    'Support AX 7 environments with practical consulting that improves daily operations, resolves gaps, strengthens reporting, and prepares the business for future upgrades.',
  image: '/assets/img/service/ERP_V.png',
  highlights: [
    'AX 7 configuration and process support',
    'Performance, reporting, and issue resolution',
    'Data and integration improvement',
    'Upgrade readiness and roadmap planning'
  ]
};

export { pageConfig };

export default function Ax7() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

