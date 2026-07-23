import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import ProjectArea from './ProjectArea';

export default function Project() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Project" subtitle="Project" />
        <ProjectArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
