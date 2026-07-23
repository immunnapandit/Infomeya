import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import D365CustomerInsights, { pageConfig } from './D365CustomerInsights';

export default function D365CustomerInsightsPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <D365CustomerInsights />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

