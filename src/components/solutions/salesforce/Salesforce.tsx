import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Salesforce',
  subtitle: 'Salesforce CRM shaped around growth and customer engagement',
  category: 'solution',
  focus: 'customer lifecycle, sales automation, service workflows, analytics, integration, and CRM governance',
  summary:
    'Support sales, service, and customer engagement teams with Salesforce solutions that improve workflow clarity, reporting, automation, and customer visibility.',
  image: '/assets/img/service/Salesforce.png',
  highlights: [
    'Salesforce implementation around revenue goals',
    'Lead, service, and customer workflow automation',
    'Pipeline reporting and management visibility',
    'Enhancement, governance, and long-term support'
  ]
};

export { pageConfig };

export default function Salesforce() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
