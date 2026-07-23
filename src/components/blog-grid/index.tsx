import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BlogGridArea from './BlogGridArea';

export default function BlogGrid() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Blog" subtitle="Blog" />
        <BlogGridArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
