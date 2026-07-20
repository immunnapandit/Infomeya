import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics NAV',
  subtitle: 'Dynamics NAV support with a practical modernization route',
  category: 'solution',
  focus: 'NAV support, process improvements, extensions, reporting, and Business Central readiness',
  summary:
    'Maintain and improve Dynamics NAV with reliable support, targeted enhancements, better reporting, and a thoughtful roadmap toward Business Central when the time is right.',
  image: '/assets/img/service/Business Central.avif',
  highlights: [
    'NAV support and stabilization',
    'Process, extension, and report improvements',
    'Operational visibility and user enablement',
    'Business Central migration advisory'
  ]
};

export { pageConfig };

export default function MicrosoftDynamicsNav() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

