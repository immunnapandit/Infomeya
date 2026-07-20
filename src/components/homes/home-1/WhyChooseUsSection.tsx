import { motion, type Variants } from "framer-motion";
import {
  BadgeDollarSign,
  BadgeHelp,
  BriefcaseBusiness,
  Lightbulb,
} from "lucide-react";
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from "../../../lib/cloudinary";
import "../../../styles/scss/layout/_why-choose-us.scss";

type WhyChooseUsItem = {
  title: string;
  description: string;
  icon: React.ElementType;
  compactTitle?: boolean;
};

const reasons: WhyChooseUsItem[] = [
  {
    title: "Experienced Specialists",
    description:
      "Our consultants understand Microsoft platforms, cloud architecture, integrations, and the business processes behind successful delivery.",
    icon: Lightbulb,
  },
  {
    title: "Process-First Delivery",
    description:
      "We study how your teams actually work, then configure ERP, CRM, cloud, and automation solutions around measurable operational goals.",
    icon: BriefcaseBusiness,
    compactTitle: true,
  },
  {
    title: "Practical Value",
    description:
      "Clear priorities, lean implementation plans, and maintainable architecture help you get more from every technology investment.",
    icon: BadgeDollarSign,
  },
  {
    title: "Clear Communication",
    description:
      "You get direct updates, visible progress, and honest guidance from discovery through launch, training, and ongoing support.",
    icon: BadgeHelp,
  },
];

const sectionVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const introVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardGridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.18,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.18,
    },
  },
};

const imageInnerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.24,
    },
  },
};

export default function WhyChooseUsSection() {
  return (
    <motion.section
      className="why-choose-us-section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="why-choose-us-layout">
          <motion.div
            className="why-choose-us-content tv-section-title-box"
            variants={sectionVariants}
          >
            <motion.h2
              className="why-choose-us-title tv-section-title tv-spltv-text tv-spltv-in-right"
              variants={introVariants}
            >
              Why Choose Infomeya?
            </motion.h2>

            <motion.p className="why-choose-us-copy" variants={introVariants}>
              Infomeya combines platform knowledge with practical execution, helping
              businesses improve operations, reduce manual work, and make better use
              of their digital ecosystem.
            </motion.p>

            <motion.div className="why-choose-us-grid" variants={cardGridVariants}>
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <motion.article
                    key={reason.title}
                    className="why-choose-us-card"
                    variants={cardVariants}
                  >
                    <motion.div className="why-choose-us-icon" variants={introVariants}>
                      <Icon size={42} strokeWidth={1.8} />
                    </motion.div>

                    <motion.h3
                      className={reason.compactTitle ? "why-choose-us-card-title why-choose-us-card-title--compact" : "why-choose-us-card-title"}
                      variants={introVariants}
                    >
                      {reason.title}
                    </motion.h3>
                    <motion.p variants={introVariants}>{reason.description}</motion.p>
                  </motion.article>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div className="why-choose-us-visual" variants={imageVariants}>
            <div className="why-choose-us-visual-frame">
              <motion.div
                className="why-choose-us-image"
                variants={imageInnerVariants}
              >
                <img
                  src={getCloudinaryAssetUrl(
                    "/assets/img/service/why.jpg",
                    CLOUDINARY_TRANSFORMS.largeVisual,
                  )}
                  alt="Business consultant evaluating a technology decision"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
