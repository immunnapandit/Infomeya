import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { type BlogPost } from '../../../data/blog-posts';
import {
  fetchPublishedBlogPosts,
  formatBlogDate,
  getCachedOrFallbackPublishedBlogPosts,
} from '../../../lib/blogs';
import {
  CLOUDINARY_TRANSFORMS,
  getCloudinaryAssetUrl,
} from '../../../lib/cloudinary';

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
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function BlogHomeTwo() {
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    getCachedOrFallbackPublishedBlogPosts().slice(0, 3),
  );

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const publishedPosts = (await fetchPublishedBlogPosts()).slice(0, 3);

        if (isMounted) {
          setPosts(publishedPosts);
        }
      } catch {
        if (isMounted) {
          setPosts(getCachedOrFallbackPublishedBlogPosts().slice(0, 3));
        }
      }
    };

    void loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!posts.length) {
    return null;
  }

  return (
    <section className="blog-premium-section">
      <div className="container">
        <motion.div
          className="section-header text-center tv-section-title-box"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="tv-section-subtitle tv-spltv-text tv-spltv-in-right"
            variants={fadeUp}
          >
            Infomeya Insights
          </motion.span>
          <motion.h2
            className="tv-section-title tv-spltv-text tv-spltv-in-right"
            variants={fadeUp}
          >
            Latest Ideas on Business Technology
          </motion.h2>
        </motion.div>

        <motion.div
          className="blog-premium-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              className="blog-card-premium"
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="blog-card-premium-image"
              >
                <img
                  src={getCloudinaryAssetUrl(
                    post.imageUrl,
                    CLOUDINARY_TRANSFORMS.blogCard,
                  )}
                  alt={post.title}
                />
              </Link>
              <div className="blog-card-premium-content">
                <div className="blog-card-premium-meta">
                  <span>{post.authorName}</span>
                  <span className="blog-card-premium-dot" aria-hidden="true" />
                  <span>{formatBlogDate(post.publishedAt)}</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-card-premium-more"
                >
                  Read More
                  <ArrowRight size={18} strokeWidth={2.2} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
