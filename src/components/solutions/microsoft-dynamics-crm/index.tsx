import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftDynamicsCrm, { pageConfig } from './MicrosoftDynamicsCrm';

export default function MicrosoftDynamicsCrmPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftDynamicsCrm />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

