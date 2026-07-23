import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import SupportManagedServices, { pageConfig } from './SupportManagedServices';

export default function SupportManagedServicesPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <SupportManagedServices />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

