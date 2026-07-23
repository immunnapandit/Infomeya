import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftDynamicsNav, { pageConfig } from './MicrosoftDynamicsNav';

export default function MicrosoftDynamicsNavPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftDynamicsNav />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

