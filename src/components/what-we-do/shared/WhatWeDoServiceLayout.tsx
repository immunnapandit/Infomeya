import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServicePageConfig } from '../../../data/service-page-types';

interface WhatWeDoServiceLayoutProps {
  page: ServicePageConfig;
}

function buildBenefits(page: ServicePageConfig) {
  return [
    {
      title: page.highlights[0],
      description: `Set the right direction for ${page.title.toLowerCase()} with discovery, priorities, and delivery choices aligned to ${page.focus}.`
    },
    {
      title: page.highlights[1],
      description: `Turn the roadmap into working capability with delivery support shaped around ${page.subtitle.toLowerCase()}.`
    },
    {
      title: page.highlights[2],
      description: `Improve visibility and handoffs by connecting teams, data, processes, and decisions around ${page.title.toLowerCase()}.`
    },
    {
      title: page.highlights[3],
      description: `Protect long-term value with measured releases, active feedback loops, and dependable ownership.`
    },
    {
      title: 'Outcome alignment',
      description: `Keep scope, adoption, and success measures tied to the business priorities behind ${page.focus}.`
    },
    {
      title: 'Sustainable growth',
      description: `Build a delivery model that supports scale, change, and consistent operations as the business evolves.`
    }
  ];
}

export default function WhatWeDoServiceLayout({ page }: WhatWeDoServiceLayoutProps) {
  const benefits = buildBenefits(page);
  const sectionLabel = page.category === 'solution' ? 'Solutions' : 'What We Do';
  const benefitsLabel = page.category === 'solution' ? 'Solution Benefits' : 'Key Benefits';

  return (
    <main className="tv-product-engineering-page">
      <section
        className="tv-pe-hero"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.94)), url('/assets/img/service/service-bg.png')"
        }}
      >
        <div className="container">
          <div className="tv-pe-heading text-center">
            <span className="tv-pe-kicker">{sectionLabel}</span>
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
          </div>

          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="tv-pe-hero-media">
                <img src={page.image} alt={page.title} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tv-pe-copy">
                <h2>{page.subtitle}</h2>
                <p>{page.summary}</p>
                <p>
                  Our teams connect planning, delivery, adoption, and improvement so each engagement moves from intent to measurable business progress.
                </p>
                <div className="tv-pe-actions">
                  <Link to="/contact" className="tv-btn-primary">
                    <span className="btn-wrap">
                      <span className="btn-text1">Contact Us</span>
                      <span className="btn-text2">Contact Us</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tv-pe-intro">
        <div className="container">
          <div className="row align-items-start g-4 g-xl-5">
            <div className="col-lg-7">
              <div className="tv-pe-content">
                <h2>Build momentum with a clear delivery foundation</h2>
                <p>
                  Our approach to {page.title.toLowerCase()} brings business goals, technical choices, project priorities, and user expectations into one practical working model.
                </p>
                <p>Key areas include:</p>
                <ul className="tv-pe-bullet-list">
                  {page.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="tv-pe-note">
                  This gives teams a cleaner path from initial planning to adoption, optimization, and ongoing operational value.
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="tv-pe-side-media">
                <img src="/assets/img/hero/hero-thumb-2.jpeg" alt={`${page.title} workspace`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="tv-pe-benefits"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url('/assets/img/service/service-bg.png')"
        }}
      >
        <div className="container">
          <div className="tv-pe-heading text-center">
            <span className="tv-pe-kicker">{benefitsLabel}</span>
            <h2>How {page.title} creates measurable business value</h2>
          </div>

          <div className="row g-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="col-md-6 col-xl-4">
                <article className="tv-pe-benefit-card">
                  <div className="tv-pe-benefit-icon" aria-hidden="true">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
