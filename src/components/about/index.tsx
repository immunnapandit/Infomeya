import AboutHomeOne from '../homes/home-1/AboutHomeOne';
//import ChooseHomeTwo from '../homes/home-2/ChooseHomeTwo';
import CounterHomeOne from '../homes/home-1/CounterHomeOne';
// import TeamHomeOne from '../homes/home-1/TeamHomeOne';
// import TestimonialHomeTwo from '../homes/home-2/TestimonialHomeTwo';
import Wrapper from '../../layouts/Wrapper';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import FooterTwo from '../../layouts/footers/FooterTwo';

export default function About() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="About us" subtitle="About us" />
        <AboutHomeOne />
        {/* <ChooseHomeTwo /> */}
        <CounterHomeOne />
        {/* <TeamHomeOne />  */}
        {/* <TestimonialHomeTwo /> */}
      </main>
      <FooterTwo />
    </Wrapper>
  );
}