import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftCertifiedTrainerRegistration from './MicrosoftCertifiedTrainerRegistration';

export default function MicrosoftCertifiedTrainerRegistrationPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb
          title="Microsoft Certified Trainer Registration"
          subtitle="Join the Infomeya Trainer Network"
        />
        <MicrosoftCertifiedTrainerRegistration />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
