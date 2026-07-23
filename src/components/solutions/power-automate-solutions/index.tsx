import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import PowerAutomateSolutions, { pageConfig } from './PowerAutomateSolutions';

export default function PowerAutomateSolutionsPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <PowerAutomateSolutions />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

