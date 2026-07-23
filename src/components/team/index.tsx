import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import TeamArea from './TeamArea';

export default function Team() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Our Team" subtitle="Our Team" />
        <TeamArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
