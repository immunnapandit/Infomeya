import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Enterprise Management',
  subtitle: 'Enterprise operations aligned through process and control',
  category: 'service',
  focus: 'operating models, governance, cross-functional visibility, controls, and reporting',
  summary:
    'Improve management visibility and operational consistency with enterprise management support that standardizes processes, strengthens controls, and connects decision makers.',
  image: '/assets/img/service/Enterprises-management.png',
  highlights: [
    'Operating model and governance design',
    'Process standardization across functions',
    'Management visibility and control alignment',
    'Performance reporting and improvement cycles'
  ]
};

export { pageConfig };

export default function EnterpriseManagement() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
