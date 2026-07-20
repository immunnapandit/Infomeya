import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Microsoft Azure',
  subtitle: 'Azure services for secure, scalable business platforms',
  category: 'solution',
  focus: 'Azure architecture, migration, integration, security, monitoring, and cloud operations',
  summary:
    'Use Microsoft Azure to modernize infrastructure, applications, data, and integrations with secure architecture and a practical operating model.',
  image: '/assets/img/service/Azure.png',
  highlights: [
    'Azure assessment and landing zone planning',
    'Application, data, and infrastructure migration',
    'Security, identity, monitoring, and governance',
    'Optimization, support, and managed operations'
  ]
};

export { pageConfig };

export default function MicrosoftAzure() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
