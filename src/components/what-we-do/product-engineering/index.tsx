import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import ProductEngineering, { pageConfig } from './ProductEngineering';

export default function ProductEngineeringPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <ProductEngineering />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

