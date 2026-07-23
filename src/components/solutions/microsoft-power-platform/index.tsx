import Breadcrumb from '../../../common/Breadcrumb';
import FooterTwo from '../../../layouts/footers/FooterTwo';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import Wrapper from '../../../layouts/Wrapper';
import MicrosoftPowerPlatform, { pageConfig } from './MicrosoftPowerPlatform';

export default function MicrosoftPowerPlatformPage() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <MicrosoftPowerPlatform />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}

