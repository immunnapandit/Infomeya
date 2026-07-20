import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Dynamics 365',
  subtitle: 'Connected Microsoft business apps for agile enterprises',
  category: 'solution',
  focus: 'ERP, CRM, automation, analytics, integration, and continuous optimization',
  summary:
    'Bring finance, operations, sales, service, and customer engagement together on Dynamics 365 with a roadmap designed for visibility, adoption, and scalable growth.',
  image: '/assets/img/service/Dynamics365Ecosystem.png',
  highlights: [
    'Business process blueprinting across ERP and CRM',
    'Dynamics 365 configuration and integration',
    'Reporting, automation, and role-based enablement',
    'Ongoing optimization and managed support'
  ]
};

export { pageConfig };

export default function MicrosoftDynamics365() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

