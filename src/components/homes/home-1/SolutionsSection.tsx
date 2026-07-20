import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from '../../../lib/cloudinary';

const solutions = [
  {
    key: 'Dynamics 365',
    title: 'Connect Every Team with Dynamics 365',
    desc: 'Unify sales, finance, service, operations, and customer data with Microsoft Dynamics 365 solutions configured around real business workflows.',
    button: 'Know More',
    href: '/solutions/microsoft-dynamics-365',
    image: '/assets/img/service/MicrosoftD365.jpg',
  },
  {
    key: 'Business Central',
    title: 'Bring Finance and Operations into One Flow',
    desc: 'Use Business Central to manage accounts, inventory, purchasing, sales, and reporting with cleaner controls and clearer day-to-day visibility.',
    button: 'Know More',
    href: '/solutions/business-central',
    image: '/assets/img/service/Business Central.avif',
  },
  {
    key: 'Azure',
    title: 'Build Secure Cloud Foundations on Azure',
    desc: 'Plan, migrate, and run cloud workloads with Azure architecture that supports security, performance, integrations, and long-term scalability.',
    button: 'Know More',
    href: '/solutions/microsoft-azure',
    image: '/assets/img/service/Azure.png',
  },
  {
    key: 'Office 365',
    title: 'Enable Productive Work with Microsoft 365',
    desc: 'Improve collaboration, document management, email, identity, and team productivity with Microsoft 365 environments that are simple to adopt.',
    button: 'Know More',
    href: '/solutions/office-365',
    image: '/assets/img/service/Office365.png',
  },
  {
    key: 'AWS',
    title: 'Run Flexible Cloud Workloads on AWS',
    desc: 'Design reliable AWS environments for applications, storage, automation, monitoring, and infrastructure that can grow with demand.',
    button: 'Know More',
    href: '/solutions/aws',
    image: '/assets/img/service/aws.png',
  },
] as const;

const panelVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 14 : -14,
    y: 4,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -14 : 14,
    y: -4,
  }),
};

const textVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 10 : -10,
    y: 4,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -10 : 10,
    y: -4,
  }),
};

const imageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 12 : -12,
    y: 6,
    scale: 0.992,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -12 : 12,
    y: -6,
    scale: 0.992,
  }),
};

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const previousTabRef = useRef(0);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const splitCleanupRef = useRef<(() => void) | null>(null);
  const active = solutions[activeTab];
  const direction = activeTab >= previousTabRef.current ? 1 : -1;

  useEffect(() => {
    solutions.forEach((item) => {
      const image = new Image();
      image.src = getCloudinaryAssetUrl(
        item.image,
        CLOUDINARY_TRANSFORMS.largeVisual,
      );
    });
  }, []);

  useEffect(() => {
    previousTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const titleElement = titleRef.current;

    if (!titleElement || typeof window === 'undefined') {
      return;
    }

    splitCleanupRef.current?.();
    splitCleanupRef.current = null;

    let isDisposed = false;

    const animateTitle = async () => {
      const gsapModule = await import('gsap');
      const SplitTextModule = await import('gsap/SplitText');

      if (isDisposed || !titleRef.current) {
        return;
      }

      const gsap = gsapModule.default;
      const SplitText = SplitTextModule.default;

      gsap.registerPlugin(SplitText);

      const split = new SplitText(titleRef.current, {
        type: 'lines,words,chars',
        linesClass: 'tv-spltv-line',
      });

      gsap.set(titleRef.current, { perspective: 400 });
      gsap.set(split.chars, { opacity: 0, x: 50 });

      const tween = gsap.to(split.chars, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
      });

      splitCleanupRef.current = () => {
        tween.kill();
        split.revert();
      };
    };

    animateTitle();

    return () => {
      isDisposed = true;
    };
  }, [activeTab]);

  useEffect(
    () => () => {
      splitCleanupRef.current?.();
    },
    [],
  );

  return (
    <section id="solutions" className="solutions-section">
      <div className="container">
        <div className="solutions-tabs-wrap">
          <div
            className="solutions-tabs"
            role="tablist"
            aria-label="Solutions categories"
          >
            {solutions.map((item, index) => (
              <motion.button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                className={`solution-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === index ? (
                  <motion.span
                    className="solution-tab-indicator"
                    layoutId="solution-tab-indicator"
                    transition={{
                      type: 'spring',
                      stiffness: 360,
                      damping: 32,
                    }}
                  />
                ) : null}
                <span className="solution-tab-label">{item.key}</span>
              </motion.button>
            ))}
          </div>
          <div className="tabs-line" />
        </div>

        <div className="solutions-content-area">
          <AnimatePresence initial={false} mode="sync" custom={direction}>
            <motion.div
              key={active.key}
              className="solutions-panel"
              variants={panelVariants}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.16, ease: 'easeOut' }}
              >
              <motion.div
                className="solutions-text tv-section-title-box"
                variants={textVariants}
                custom={direction}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.14, ease: 'easeOut' }}
              >
                <h2
                  key={`solution-title-${active.key}`}
                  ref={titleRef}
                  className="solutions-title tv-section-title tv-spltv-text tv-spltv-in-right"
                >
                  {active.title}
                </h2>
                <motion.p
                  className="solutions-desc"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.14, delay: 0.01, ease: 'easeOut' }}
                >
                  {active.desc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12, delay: 0.02, ease: 'easeOut' }}
                >
                  <Link to={active.href} className="solutions-btn">
                    {active.button}
                    <span>&rsaquo;</span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="solutions-visual"
                variants={imageVariants}
                custom={direction}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <div className="visual-circle" />
                <div className="visual-glow" />

                <motion.div
                  className="visual-card"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={getCloudinaryAssetUrl(
                      active.image,
                      CLOUDINARY_TRANSFORMS.largeVisual,
                    )}
                    alt={active.key}
                    className="visual-image"
                    loading="eager"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
