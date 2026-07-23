import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import Aws, { pageConfig } from './Aws';

export default function AwsPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <Aws />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
