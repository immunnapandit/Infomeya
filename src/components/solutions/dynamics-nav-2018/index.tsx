import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import DynamicsNav2018, { pageConfig } from './DynamicsNav2018';

export default function DynamicsNav2018Page() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <DynamicsNav2018 />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

