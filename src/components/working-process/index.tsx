import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ProcessHomeOne from '../homes/home-1/ProcessHomeOne';

export default function WorkingProcess() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Working Process" subtitle="Working Process" />
        <ProcessHomeOne />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
