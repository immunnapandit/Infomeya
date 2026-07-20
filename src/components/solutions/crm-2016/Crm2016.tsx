import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'CRM 2016',
  subtitle: 'CRM 2016 enhancements for cleaner customer processes',
  category: 'solution',
  focus: 'CRM 2016 customization, automation, analytics, support, and migration planning',
  summary:
    'Extend and stabilize Dynamics CRM 2016 with better customer workflows, cleaner reporting, practical support, and a roadmap for the next platform stage.',
  image: '/assets/img/service/service-thumb-3.png',
  highlights: [
    'CRM 2016 customization and workflow tuning',
    'Data, dashboard, and reporting improvement',
    'Operational support and issue resolution',
    'Modernization assessment and roadmap'
  ]
};

export { pageConfig };

export default function Crm2016() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

