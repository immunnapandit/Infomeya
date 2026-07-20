import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: '',
  subtitle: '',
  category: 'solution',
  focus: 'cloud strategy, migration, modernization, security, scalability, and operational governance',
  summary:
    'Plan and modernize cloud environments with architecture, migration, security, monitoring, and optimization support aligned to business priorities.',
  image: '/assets/img/service/cloud.png',
  highlights: [
    'Cloud assessment and migration roadmap',
    'Secure architecture and platform modernization',
    'Scalability, monitoring, and cost awareness',
    'Operational governance and managed support'
  ]
};

export { pageConfig };

export default function CloudTechnology() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
