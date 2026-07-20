import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Commerce',
  subtitle: 'Commerce operations built for connected customer experiences',
  category: 'solution',
  focus: 'retail operations, POS, inventory, customer journeys, order management, and analytics',
  summary:
    'Support modern commerce with connected retail processes that align stores, online channels, inventory, promotions, customer data, and operational reporting.',
  image: '/assets/img/service/warehouse.jpg',
  highlights: [
    'Omnichannel retail process design',
    'POS, inventory, and order flow enablement',
    'Customer engagement and promotion support',
    'Store operations reporting and optimization'
  ]
};

export { pageConfig };

export default function D365Retail() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

