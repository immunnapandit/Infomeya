import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import WebinarsEvents, { pageConfig } from './WebinarsEvents';

export default function WebinarsEventsPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <WebinarsEvents />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

