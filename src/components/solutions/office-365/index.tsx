import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import Office365, { pageConfig } from './Office365';

export default function Office365Page() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <Office365 />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
