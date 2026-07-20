import type { ServicePageConfig } from '../../../data/service-page-types';
import GenericServiceArea from '../../solutions/generic/GenericServiceArea';

const pageConfig: ServicePageConfig = {
  title: 'Training',
  subtitle: 'Role-based technology training for confident adoption',
  category: 'service',
  focus: 'Microsoft training, enterprise workshops, certification readiness, and hands-on enablement',
  summary:
    'Help teams learn faster and use technology better through structured training programs, practical scenarios, guided labs, and adoption-focused learning paths.',
  image: '/assets/img/service/MCTRT.png',
  highlights: [
    'Role-based learning plans and workshops',
    'Microsoft technology and certification readiness',
    'Hands-on labs and business scenarios',
    'Post-training support and adoption guidance'
  ]
};

export { pageConfig };

export default function Training() {
  return <GenericServiceArea page={pageConfig} />;
}
