import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Power Automate Solutions',
  subtitle: 'Automation that removes delay from routine work',
  category: 'solution',
  focus: 'approvals, alerts, task routing, integrations, governance, and workflow optimization',
  summary:
    'Automate repeated steps with Power Automate workflows that reduce manual follow-up, improve accountability, connect systems, and keep processes measurable.',
  image: '/assets/img/service/flow chart.png',
  highlights: [
    'Automation discovery and opportunity mapping',
    'Approval, alert, and notification workflows',
    'System orchestration and data movement',
    'Governed rollout and ongoing optimization'
  ]
};

export { pageConfig };

export default function PowerAutomateSolutions() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

