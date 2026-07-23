import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import CloudTechnology, { pageConfig } from './CloudTechnology';

export default function CloudTechnologyPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <CloudTechnology />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
