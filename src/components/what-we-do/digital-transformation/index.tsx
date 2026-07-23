import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import DigitalTransformation, { pageConfig } from './DigitalTransformation';

export default function DigitalTransformationPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <DigitalTransformation />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

