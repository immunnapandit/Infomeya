import {
  BriefcaseBusiness,
  Check,
  FileCog,
  Gauge,
  Globe2,
  Handshake,
  Headphones,
  Layers3,
  LifeBuoy,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ServicePageConfig } from '../../../data/service-page-types';

const pageConfig: ServicePageConfig = {
  title: 'Dynamics 365 Finance',
  subtitle: 'Modern finance operations with stronger control and insight',
  category: 'solution',
  focus: 'financial processes, compliance, reporting, automation, and operational control',
  summary:
    'Implement Dynamics 365 Finance with cleaner controls, connected reporting, automated finance work, and scalable processes for growing organizations.',
  image: '/assets/img/service/MicrosoftD365.jpg',
  highlights: [
    'Finance process design and ERP configuration',
    'Reporting, compliance, and control visibility',
    'Integrations, automation, and workflow improvements',
    'Optimization, support, and future-state planning'
  ]
};

const offerBullets = [
  'Consolidated finance data for faster period-end decisions',
  'Approval flows, control checks, and traceable audit history',
  'Smoother billing, collections, vendor payments, and reconciliation',
  'Clear budget, cost, and cash visibility across business entities'
];

const aiBullets = [
  'Surface exceptions before they delay financial close',
  'Convert finance activity into leadership-ready insight',
  'Support multi-currency operations with clearer reporting'
];

const modules = [
  {
    label: 'Core Finance',
    items: [
      {
        title: 'General Ledger',
        text: 'Manage ledgers, transactions, balances, and reporting structures with dependable financial control.'
      },
      {
        title: 'Accounts Receivable',
        text: 'Manage invoices, customer balances, receipts, and collection visibility with less manual follow-up.'
      },
      {
        title: 'Accounts Payable',
        text: 'Process vendor invoices, approval rules, payment runs, and exception handling more consistently.'
      },
      {
        title: 'Fixed Assets',
        text: 'Track assets, depreciation schedules, transfers, disposals, and asset-related accounting records.'
      },
      {
        title: 'Bank and Cash Management',
        text: 'Reconcile bank activity, monitor cash position, and prepare treasury-ready operational reports.'
      },
      {
        title: 'Credit and Collections',
        text: 'Centralize credit controls, collection activity, customer risk, and follow-up discipline.'
      }
    ]
  },
  {
    label: 'Budgeting and Forecasting',
    items: [
      {
        title: 'Budget Planning',
        text: 'Build budgets by department or entity with approvals, revisions, and variance tracking.'
      },
      {
        title: 'Cash Forecasting',
        text: 'Forecast inflows, outflows, liquidity, and working-capital needs using current operational data.'
      },
      {
        title: 'Scenario Modeling',
        text: 'Model multiple finance scenarios so leadership can plan around changing conditions.'
      }
    ]
  },
  {
    label: 'Cost Management',
    items: [
      {
        title: 'Cost Accounting',
        text: 'Analyze cost centers, allocations, product costs, and profitability across business units.'
      },
      {
        title: 'Expense Control',
        text: 'Tighten approvals, policy checks, and visibility over recurring operational spend.'
      }
    ]
  },
  {
    label: 'Financial Reporting and Analysis',
    items: [
      {
        title: 'Management Reports',
        text: 'Create leadership reports with consolidated views across entities, dimensions, and regions.'
      },
      {
        title: 'Embedded Analytics',
        text: 'Turn daily finance activity into dashboards that make exceptions and trends easier to act on.'
      }
    ]
  },
  {
    label: 'Advanced Modules',
    items: [
      {
        title: 'Tax and Compliance',
        text: 'Support tax rules, audit trails, statutory requirements, and compliance governance.'
      },
      {
        title: 'Intercompany Accounting',
        text: 'Simplify intercompany transactions and keep consolidation, eliminations, and reporting cleaner.'
      }
    ]
  }
];

const benefits = [
  {
    icon: Sparkles,
    title: 'Proactive Decision Making',
    text: 'Use forecasting, analytics, and AI-assisted signals to monitor cash, understand trends, improve margins, and shorten close cycles.'
  },
  {
    icon: Settings,
    title: 'Automate Operations',
    text: 'Automate recurring finance work, reduce manual effort, define approval rules, and connect finance data across Microsoft applications.'
  },
  {
    icon: Gauge,
    title: 'Maximize Profit Margins',
    text: 'Understand cost behavior, revenue patterns, and margins so teams can focus attention on profitable growth.'
  },
  {
    icon: Globe2,
    title: 'Scale Globally',
    text: 'Support multi-currency operations, local tax needs, and compliance as the business expands across markets.'
  }
];

const fitPoints = [
  {
    label: 'Organization Size',
    text: 'Best for growing and enterprise teams that need advanced controls, higher transaction volume, and scalable multi-user finance operations.'
  },
  {
    label: 'Core Capabilities',
    text: 'Choose it when reporting, budgeting, compliance, automation, and finance-specific ERP depth have become business-critical.'
  },
  {
    label: 'Advanced Features',
    text: 'Use modern functionality for analysis, compliance, workflow approvals, controls, and evolving operational requirements.'
  },
  {
    label: 'Global Business',
    text: 'Ideal for organizations managing multiple locations, currencies, entities, regulations, and regional reporting needs.'
  }
];

const services = [
  {
    icon: FileCog,
    title: 'Dynamics 365 Finance Implementation',
    text: 'Launch Dynamics 365 Finance with structured discovery, clean process design, configuration, migration, testing, and adoption support.'
  },
  {
    icon: Layers3,
    title: 'Dynamics 365 Finance Customizations',
    text: 'Tailor workflows, reports, integrations, security, and user experiences so the platform fits your operating model.'
  },
  {
    icon: Headphones,
    title: 'Dynamics 365 Finance Support',
    text: 'Keep finance operations stable with responsive support, issue resolution, release guidance, and ongoing optimization.'
  }
];

const reasons = [
  {
    icon: BriefcaseBusiness,
    title: 'Proven Track Record',
    text: 'Our team brings practical Microsoft business application experience across ERP, CRM, cloud, analytics, and transformation programs.'
  },
  {
    icon: Handshake,
    title: 'Personalized Approach',
    text: 'We start with requirements, constraints, and goals, then shape the solution around your operating model.'
  },
  {
    icon: LifeBuoy,
    title: 'Agile Support System',
    text: 'We support the journey before and after go-live with maintenance, optimization, and continuity assistance.'
  },
  {
    icon: Globe2,
    title: 'Global Infrastructure',
    text: 'We help design reliable services for remote, hybrid, and multi-region teams while keeping compliance visible.'
  }
];

function FinanceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tv-finance-image-frame tv-d365-reveal" style={{ '--d365-delay': '0.12s' } as CSSProperties}>
      <img src={src} alt={alt} />
    </div>
  );
}

export { pageConfig };

export default function D365FinanceArea() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = modules[activeModuleIndex];
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const items = Array.from(page.querySelectorAll<HTMLElement>('.tv-d365-reveal'));

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="tv-d365-finance-page" ref={pageRef}>
      <div className="tv-d365-section tv-d365-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="tv-d365-hero-content tv-d365-hero-animate">
                <span className="tv-d365-kicker">Microsoft Dynamics 365 Finance</span>
                <h1>
                  Modern Finance Control for <span>Confident Growth</span>
                </h1>
                <p>
                  Modernize finance planning, governance, reporting, and automation with Dynamics 365 Finance implementation support.
                </p>
                <a className="tv-d365-primary-btn" href="/contact">
                  Get Started!
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <FinanceImage
                src="/assets/img/d365-finance/finance-ai-insights.svg"
                alt="Dynamics 365 Finance dashboard illustration"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-d365-split-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-hero-dashboard.svg"
                alt="Connected finance operations workflow"
              />
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="tv-d365-copy tv-d365-reveal" style={{ '--d365-delay': '0.08s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Connect Finance, Controls, and Reporting <span>in One Platform</span>
                </h2>
                <p>
                  Dynamics 365 Finance gives growing organizations a cloud ERP foundation for governance, reporting, automation, and scalable finance operations.
                </p>
                <p>
                  We align the platform to your workflows so finance teams can reduce manual effort, close faster, and trust the numbers they use daily.
                </p>
                <h3>What your finance team can improve:</h3>
                <ul className="tv-pill-list">
                  {offerBullets.map((item) => (
                    <li key={item}>
                      <Check size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  The result is a finance foundation that works on its own and connects cleanly with the wider Microsoft business application ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-d365-split-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-flow.svg"
                alt="AI insights for finance analytics"
              />
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="tv-d365-copy tv-d365-reveal" style={{ '--d365-delay': '0.08s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Make Finance Decisions <span>with Clearer Signals</span>
                </h2>
                <p>
                  Use automation, analytics, and AI-assisted insight to identify trends, exceptions, and risks while finance work is still moving.
                </p>
                <p>
                  Leadership gets a clearer business view, while finance teams gain support for forecasting, reporting, reconciliations, and recurring tasks.
                </p>
                <p>
                  We configure these capabilities around the way your organization manages entities, currencies, approvals, and compliance responsibilities.
                </p>
                <ul className="tv-pill-list">
                  {aiBullets.map((item) => (
                    <li key={item}>
                      <Check size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-modules-section">
        <div className="container">
          <div className="tv-d365-center-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
            <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
              Finance Modules <span>Mapped to Your Operating Model</span>
            </h2>
            <p>
              Start with the finance modules your team needs most, then extend the platform as reporting, governance, and automation requirements mature.
            </p>
          </div>
          <div className="tv-modules-panel tv-d365-reveal" style={{ '--d365-delay': '0.12s' } as CSSProperties}>
            <div className="tv-module-tabs">
              {modules.map((module, index) => (
                <button
                  className={index === activeModuleIndex ? 'active' : ''}
                  key={module.label}
                  onClick={() => setActiveModuleIndex(index)}
                  type="button"
                >
                  {module.label}
                </button>
              ))}
            </div>
            <div className="tv-module-grid">
              {activeModule.items.map((item) => (
                <article className="tv-module-card" key={item.title}>
                  <Check size={26} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-benefits-section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-xl-7 col-lg-7">
              <div className="tv-d365-left-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Business Benefits <span>for Finance Leaders and Teams</span>
                </h2>
                <p>
                  We focus on measurable improvements: fewer manual steps, stronger controls, faster visibility, and a finance setup that can support growth.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-growth-rocket.svg"
                alt="Finance growth and efficiency illustration"
              />
            </div>
          </div>
          <div className="tv-benefit-grid">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article className="tv-benefit-card tv-d365-reveal" style={{ '--d365-delay': `${0.08 + index * 0.08}s` } as CSSProperties} key={title}>
                <span>
                  <Icon size={34} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-fit-section">
        <div className="container">
          <div className="tv-d365-center-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
            <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
              When Dynamics 365 Finance <span>Is the Right Fit</span>
            </h2>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-7">
              <div className="tv-fit-copy tv-d365-reveal" style={{ '--d365-delay': '0.08s' } as CSSProperties}>
                <p>
                  <strong>Implementing Dynamics 365 Finance</strong> depends on your operating model, reporting complexity, and growth plan. These points help confirm whether the platform fits your next stage.
                </p>
                {fitPoints.map((point) => (
                  <p key={point.label}>
                    <b>{point.label}:</b> {point.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-decision-badge.svg"
                alt="Dynamics 365 Finance decision fit illustration"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-services-section">
        <div className="container">
          <div className="tv-d365-center-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
            <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
              Dynamics 365 Finance <span>Services for Your Roadmap</span>
            </h2>
            <p>
              We support the journey from planning and implementation to customization, integrations, reporting, and ongoing optimization.
            </p>
          </div>
          <div className="tv-services-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="tv-service-card tv-d365-reveal" style={{ '--d365-delay': `${0.08 + index * 0.08}s` } as CSSProperties} key={title}>
                <span>
                  <Icon size={54} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="/contact" aria-label={`Discuss ${title}`}>
                  -&gt;
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="tv-d365-section tv-why-section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-xl-6 col-lg-7">
              <div className="tv-d365-left-head tv-d365-reveal" style={{ '--d365-delay': '0.05s' } as CSSProperties}>
                <h2 className="tv-d365-scroll-heading tv-d365-reveal" style={{ '--d365-delay': '0s' } as CSSProperties}>
                  Why Teams Choose <span>Infomeya</span>
                </h2>
                <p>
                  Work with consultants who understand Microsoft business applications, finance processes, cloud platforms, and the delivery discipline needed for stable ERP outcomes.
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <FinanceImage
                src="/assets/img/d365-finance/finance-infomeya-choice.svg"
                alt="Infomeya Dynamics 365 Finance partner illustration"
              />
            </div>
          </div>
          <div className="tv-reasons-grid">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <article className="tv-reason-card tv-d365-reveal" style={{ '--d365-delay': `${0.08 + index * 0.08}s` } as CSSProperties} key={title}>
                <span>
                  <Icon size={34} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
