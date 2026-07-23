export default function CtaHomeTwo() {
  return (
    <div
      className="tv-cta2-area  footer-bg"
      style={{ backgroundImage: `url(/assets/img/contact/mask-bg.png)` }}
    >
      <div className="bg-img pb-130 pt-130">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="tv-cta2-left">
                <img
                  className="tv-cta2-image"
                  src="/assets/img/contact/cta-bg-2-1.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tv-cta2-right">
                <h2 className="tv-spltv-text tv-spltv-in-right">
                  Subscribe to Our Newsletter
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
                <div className="tv-newsletter-form">
                  <form action="#">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      required
                    />
                    <button className="tv-btn-primary p-relative">
                      <span className="btn-wrap">
                        <span className="btn-text1">Submit Now</span>
                        <span className="btn-text2">Submit Now</span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
