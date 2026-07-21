import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from '../../../lib/cloudinary';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const services = [
  {
    title: 'Microsoft Dynamics 365',
    desc: 'ERP and CRM consulting to connect departments, strengthen controls, and make business information easier to act on.',
    img: '/assets/img/service/Dynamics365.svg',
    accent: '#0068f0',
    href: '/solutions/microsoft-dynamics-365',
  },
  {
    title: 'Microsoft Azure',
    desc: 'Azure planning, migration, optimization, and support for teams that need secure and scalable cloud foundations.',
    img: '/assets/img/service/azure-icon.svg',
    accent: '#6C4DFF',
    href: '/solutions/microsoft-azure',
  },
  {
    title: 'Power Platform',
    desc: 'Low-code apps, automated workflows, approvals, and connected tools that remove repetitive work from daily operations.',
    img: '/assets/img/service/PowerPlatform.svg',
    accent: '#0EA5E9',
    href: '/solutions/microsoft-power-platform',
  },
  {
    title: 'Microsoft Power BI',
    desc: 'Reporting models and dashboards that help leaders track performance, spot issues, and act with confidence.',
    img: '/assets/img/service/power-bi-icon.svg',
    accent: '#14B8A6',
    href: '/solutions/microsoft-power-bi',
  },
  {
    title: 'Cloud Technology',
    desc: 'Cloud migration, infrastructure management, monitoring, DevOps automation, and performance-focused operations.',
    img: '/assets/img/service/Cloud.svg',
    accent: '#4F46E5',
    href: '/solutions/cloud-technology',
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Applied AI for workflow automation, document intelligence, forecasting, support tools, and decision assistance.',
    img: '/assets/img/service/aichip.svg',
    accent: '#EC4899',
    href: '/ai-solutions',
  },
  {
    title: 'ERP Implementation',
    desc: 'Structured ERP implementation from process mapping and configuration to testing, launch, adoption, and support.',
    img: '/assets/img/service/erp-icon.svg',
    accent: '#F97316',
    href: '/what-we-do/erp-implementation',
  },
  {
    title: 'Office 365',
    desc: 'Microsoft 365 setup, migration, collaboration, identity, security, and user enablement for modern workplaces.',
    img: '/assets/img/service/Microsoft_365.svg',
    accent: '#2563EB',
    href: '/solutions/office-365',
  },
  {
    title: 'Web Development',
    desc: 'Websites and business applications built for performance, usability, integrations, maintainability, and growth.',
    img: '/assets/img/service/webdevelopment.svg',
    accent: '#10B981',
    href: '/what-we-do/web-development',
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export default function ServiceHomeTwo() {
  return (
    <section id="services" className="service-premium-section white-bg">
      <div className="container position-relative">
        <motion.div
          className="section-header text-center tv-section-title-box"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="section-kicker tv-section-subtitle tv-spltv-text tv-spltv-in-right"
            variants={fadeUp}
          >
            Our Services
          </motion.span>

          <motion.h2
            className="section-title tv-section-title tv-spltv-text tv-spltv-in-right"
            variants={fadeUp}
          >
            Technology Services Built Around Your Business
          </motion.h2>

          <motion.div className="service-subtitle-row" variants={fadeUp}>
            <p className="section-subtitle">
              Infomeya delivers Microsoft, cloud, data, AI, and application services
              that help teams simplify work and scale with confidence.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="slider-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.75,
            ease: 'easeOut',
          }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
            }}
            loop
            speed={1100}
            pagination={{ clickable: true, el: '.service-pagination' }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              576: { slidesPerView: 1, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 2, spaceBetween: 22 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
              1440: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="premium-service-swiper"
          >
            {services.map((item) => (
              <SwiperSlide key={item.title} className="service-slide">
                <motion.div
                  className="service-card-premium"
                  style={{ '--accent': item.accent } as CSSProperties}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="service-image-wrap">
                    <div className="image-frame" />
                    <img
                      src={getCloudinaryAssetUrl(
                        item.img,
                        CLOUDINARY_TRANSFORMS.logo,
                      )}
                      alt={item.title}
                      className="service-image"
                    />
                    <div className="service-image-overlay" />
                    <div className="service-corner-glow" />
                    <div className="service-line-shape">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="service-content">
                    <div className="service-mini-line" />

                    <h3 className="service-card-title">
                      <Link to={item.href}>{item.title}</Link>
                    </h3>

                    <p className="service-card-desc">{item.desc}</p>

                    <Link to={item.href} className="service-read-more">
                      Explore Service
                      <span className="arrow" aria-hidden="true">
                        {'\u2192'}
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="service-pagination" />
        </motion.div>
      </div>
    </section>
  );
}
