import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'Consulting',
  subtitle: 'Advisory that turns business questions into delivery direction',
  category: 'service',
  focus: 'assessments, solution strategy, business cases, roadmap planning, and delivery governance',
  summary:
    'Get senior consulting support for platform decisions, transformation planning, operating model improvements, and execution governance across business applications.',
  image: '/assets/img/service/Consulting.png',
  highlights: [
    'Current-state assessments and opportunity scans',
    'Roadmaps, estimates, and business case support',
    'Solution architecture and delivery strategy',
    'Governance, risk, and execution guidance'
  ]
};

export { pageConfig };

export default function Consulting() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}
