import ServiceArea from './ServiceArea';
import TestimonialHomeOne from '../homes/home-1/TestimonialHomeOne';
import Wrapper from '../../layouts/Wrapper';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';

export default function Service() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Services" subtitle="Services" />
        <ServiceArea />
        <TestimonialHomeOne />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
