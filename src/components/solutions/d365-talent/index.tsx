import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import D365Talent, { pageConfig } from './D365Talent';

export default function D365TalentPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <D365Talent />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

