import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'ERP Implementation',
  subtitle: 'ERP programs planned around process clarity and adoption',
  category: 'service',
  focus: 'process discovery, solution design, migration, rollout, and post-go-live improvement',
  summary:
    'Modernize core business operations with ERP implementation support that connects requirements, configuration, validation, training, and stabilization into one accountable delivery path.',
  image: '/assets/img/service/ERP_V.png',
  highlights: [
    'Process-led fit-gap discovery',
    'Configuration aligned to daily operations',
    'Migration, testing, and user readiness',
    'Go-live stabilization and continuous improvement'
  ]
};

export { pageConfig };

export default function ErpImplementation() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
