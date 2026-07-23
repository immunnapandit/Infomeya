import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import D365ProjectServiceAutomation, { pageConfig } from './D365ProjectServiceAutomation';

export default function D365ProjectServiceAutomationPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <D365ProjectServiceAutomation />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

