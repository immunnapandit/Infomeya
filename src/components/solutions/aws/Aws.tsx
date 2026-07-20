import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'AWS',
  subtitle: 'AWS cloud delivery with practical architecture discipline',
  category: 'solution',
  focus: 'AWS architecture, migration, application hosting, security, monitoring, and cost optimization',
  summary:
    'Design and operate AWS environments that support reliable applications, secure infrastructure, performance visibility, and controlled cloud spending.',
  image: '/assets/img/service/aws.png',
  highlights: [
    'AWS assessment and architecture planning',
    'Migration and application hosting support',
    'Security, monitoring, and backup alignment',
    'Cost, performance, and operations optimization'
  ]
};

export { pageConfig };

export default function Aws() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
