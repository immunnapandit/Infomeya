import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Marketing',
  subtitle: 'Marketing journeys connected to customer intent',
  category: 'solution',
  focus: 'campaign planning, customer journeys, segmentation, automation, and performance insight',
  summary:
    'Plan and run marketing programs that connect audience data, automated journeys, campaign execution, and reporting for stronger customer engagement.',
  image: '/assets/img/service/Digital-transformation.png',
  highlights: [
    'Campaign and journey design',
    'Audience segmentation and targeting',
    'Marketing automation and lead nurturing',
    'Performance reporting and optimization'
  ]
};

export { pageConfig };

export default function D365Marketing() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

