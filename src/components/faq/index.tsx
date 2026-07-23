import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import FaqArea from './FaqArea';

export default function Faq() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="FAQ" subtitle="FAQ" />
        <FaqArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
