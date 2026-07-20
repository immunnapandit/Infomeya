import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Supply Chain Management',
  subtitle: 'Supply chain visibility from planning to fulfillment',
  category: 'solution',
  focus: 'procurement, inventory, warehouse, production, logistics, and demand planning',
  summary:
    'Improve supply chain performance with Dynamics 365 capabilities that connect planning, sourcing, inventory, warehouse operations, and fulfillment visibility.',
  image: '/assets/img/service/AdvanceWarehouse.jpg',
  highlights: [
    'Procurement and vendor process alignment',
    'Inventory, warehouse, and fulfillment control',
    'Planning, production, and logistics visibility',
    'Analytics, automation, and continuous improvement'
  ]
};

export { pageConfig };

export default function D365SupplyChainManagement() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

