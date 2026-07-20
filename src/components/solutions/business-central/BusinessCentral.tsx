import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Business Central',
  subtitle: 'Business Central ERP for growing companies',
  category: 'solution',
  focus: 'finance, sales, purchasing, inventory, projects, reporting, and SMB process automation',
  summary:
    'Implement Microsoft Dynamics 365 Business Central to connect finance, operations, sales, purchasing, inventory, and reporting in one manageable ERP platform.',
  image: '/assets/img/service/BusinessCentral.svg',
  highlights: [
    'Business Central fit-gap and process design',
    'Finance, inventory, sales, and purchasing setup',
    'Migration, extensions, and reporting support',
    'Training, support, and continuous improvement'
  ]
};

export { pageConfig };

export default function BusinessCentral() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
