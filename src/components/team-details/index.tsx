import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import TeamDetailsArea from './TeamDetailsArea';

export default function TeamDetails() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Team Details" subtitle="Team Details" />
        <TeamDetailsArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
