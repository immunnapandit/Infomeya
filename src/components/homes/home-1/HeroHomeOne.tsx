import { Link } from 'react-router-dom';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from '../../../lib/cloudinary';

// swiper css
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const heroSlides = [
  {
    backgroundImage: getCloudinaryAssetUrl(
      '/assets/img/slider/Businees.jpg',
      CLOUDINARY_TRANSFORMS.hero,
    ),
    subtitle: 'Infomeya Digital Solutions',
    title: 'Modernize Operations with Technology That Fits',
    description:
      'Infomeya helps growing teams connect systems, simplify processes, and build reliable digital foundations across Microsoft Dynamics 365, Azure, and modern cloud platforms.',
  },
  {
    backgroundImage: getCloudinaryAssetUrl(
      '/assets/img/slider/financilabuilding.jpg',
      CLOUDINARY_TRANSFORMS.hero,
    ),
    subtitle: 'ERP, CRM, and Cloud Experts',
    title: 'Make Better Decisions with Connected Business Data',
    description:
      'Bring finance, sales, service, operations, and reporting into one smarter flow with practical ERP, CRM, automation, and analytics solutions.',
  },
  {
    backgroundImage: getCloudinaryAssetUrl(
      '/assets/img/slider/cloud4.png',
      CLOUDINARY_TRANSFORMS.hero,
    ),
    subtitle: 'Built for Scalable Growth',
    title: 'Turn Ideas into Secure, High-Performing Applications',
    description:
      'From cloud migration to custom web platforms, Infomeya designs and delivers systems that are easier to manage, integrate, and scale.',
  },
];

export default function HeroHomeOne() {
  return (
    <div className="tv-slider-area">
      <div className="tv-slider-wrap">
        <Swiper
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4500, disableOnInteraction: true }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: (index: number, className: string) =>
              `<span class="${className}">${index + 1}</span>`,
          }}
          modules={[Autoplay, Pagination, EffectFade]}
          className="swiper-container tv-slider-active tv-slider-animation p-relative"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide className="swiper-slide" key={slide.title}>
              <div className="tv-slider-overlay z-index-1 fix p-relative">
                <div
                  className="tv-slider-bg"
                  style={{
                    backgroundImage: `url(${slide.backgroundImage})`,
                  }}
                ></div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6">
                      <div className="tv-slider-content z-index-1">
                        <span className="tv-slider-subtitle">{slide.subtitle}</span>
                        <h1
                          className="tv-slider-title p-relative"
                          style={{
                            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                            lineHeight: 1.15,
                          }}
                        >
                          {slide.title}
                        </h1>
                        <div className="tv-slider-text pb-20">
                          <p>{slide.description}</p>
                        </div>
                        <div className="tv-slider-btn">
                          <Link to="/contact" className="tv-btn-primary">
                            <span className="btn-wrap">
                              <span className="btn-text1">Let's Talk</span>
                              <span className="btn-text2">Let's Talk</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="tv-slider-arrow-box d-none d-lg-block">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
