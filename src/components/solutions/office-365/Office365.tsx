import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Office 365',
  subtitle: 'Secure productivity and collaboration for modern teams',
  category: 'solution',
  focus: 'Microsoft 365 migration, Teams, SharePoint, OneDrive, identity, security, and adoption',
  summary:
    'Modernize workplace communication with Microsoft 365 services that improve collaboration, simplify administration, strengthen security, and support hybrid work.',
  image: '/assets/img/service/Office365.png',
  highlights: [
    'Exchange Online and mailbox migration planning',
    'Teams, SharePoint, and OneDrive rollout',
    'Identity, access, and security configuration',
    'Governance, training, and adoption support'
  ]
};

export { pageConfig };

export default function Office365() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
