import type { ServicePageConfig } from '../../../data/service-page-types';
import WhatWeDoServiceLayout from '../../what-we-do/shared/WhatWeDoServiceLayout';

const pageConfig: ServicePageConfig = {
  title: 'AI Solutions',
  subtitle: 'AI solutions that turn business data into useful action',
  category: 'solution',
  focus: 'AI readiness, copilots, automation, analytics, intelligent workflows, and governance',
  summary:
    'Move AI from idea to useful business capability with readiness assessment, practical use cases, secure implementation, and measurable workflow improvements.',
  image: '/assets/img/service/ArtificalIntelligence.png',
  highlights: [
    'AI opportunity discovery and readiness review',
    'Copilot and intelligent workflow enablement',
    'Data, model, and integration planning',
    'Governance, adoption, and value tracking'
  ]
};

export { pageConfig };

export default function AiSolutions() {
  return <WhatWeDoServiceLayout page={pageConfig} />;
}

