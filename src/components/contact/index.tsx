import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ContactArea from './ContactArea';

export default function Contact() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Contact Us" subtitle="Contact Us" />
        <ContactArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
