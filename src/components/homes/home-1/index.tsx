import HeroHomeOne from './HeroHomeOne';
// import TestimonialHomeOne from './TestimonialHomeOne';
import Wrapper from '../../../layouts/Wrapper';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import ServiceHomeTwo from '../home-2/ServiceHomeTwo';
import BlogHomeTwo from '../home-2/BlogHomeTwo';
import IndustriesSection from './IndustriesSection';
import OurTraining from './OurTraining';
import SolutionsSection from './SolutionsSection';
import AboutHomeThree from '../home-3/AboutHomeThree';
import ChooseHomeTwo from '../home-2/ChooseHomeTwo';
import CtaHomeTwo from '../home-2/CtaHomeTwo';

export default function HomeOne() {
  return (
    <Wrapper>
      <HeaderOne />
      <main className="home-one-page">
        <HeroHomeOne />
        <AboutHomeThree/>
        <ServiceHomeTwo />
        <SolutionsSection />
        <IndustriesSection />
        <ChooseHomeTwo />
        <OurTraining />
        {/* <TestimonialHomeOne /> */}
         {/* <OurClient /> */}
         <CtaHomeTwo />
        <BlogHomeTwo />
        
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
