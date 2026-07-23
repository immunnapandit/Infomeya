import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import D365SupplyChainManagement, { pageConfig } from './D365SupplyChainManagement';

export default function D365SupplyChainManagementPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <D365SupplyChainManagement />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

