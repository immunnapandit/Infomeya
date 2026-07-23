import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import BlogDetailsArea from './BlogDetailsArea';

export default function BlogDetails() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Blog Details" subtitle="Blog" />
        <BlogDetailsArea />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
