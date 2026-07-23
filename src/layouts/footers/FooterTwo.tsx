import { Link } from 'react-router-dom';
import { socialLinks } from '../../data/social-links';

export default function FooterTwo() {
  return (
    <footer>
      <div
        className="tv-footer-wrap sytle-2 footer-bg z-index-1 pt-130"
        style={{ backgroundImage: 'url(/assets/img/footer/footer-bg-2-1.png)' }}
      >
        <div className="tv-footer-area mb-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-1">
                  <div className="tv-footer-widget-logo mb-30">
                    <Link to="/">
                      <img src="/assets/img/logo/InfomeyaLogo.jpeg" alt="" />
                    </Link>
                  </div>
                  <div className="tv-footer-widget-text">
                    <p>
                      Infomeya is a technology-driven company delivering smart digital solutions, including web development, CRM, ERP, and business automation to help businesses grow and scale efficiently.
                    </p>
                  </div>
                  <div className="tv-footer-widget-contact-info">
                    <ul>
                      <li>
                        <a href="mailto:ramprasad.mani@infomeya.com">
                          <i className="fa-solid fa-envelope"></i>
                          ramprasad.mani@infomeya.com
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=1+Commonwealth+Lane+%2306-17+One+Commonwealth+Singapore+149544"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-solid fa-location-dot"></i>
                          1 Commonwealth Lane, #06-17, One Commonwealth, Singapore (149544)
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-2">
                  <h4 className="tv-footer-widget-title">Quick Links</h4>
                  <div className="tv-footer-widget-menu">
                    <ul>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/#services">Services</Link>
                      </li>
                      <li>
                        <Link to="/careers">Careers</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-3 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Services</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <Link to="/solutions/microsoft-dynamics-365">Dynamics 365</Link>
                        </li>
                        <li>
                          <Link to="/solutions/microsoft-azure">Azure</Link>
                        </li>
                        <li>
                          <Link to="/what-we-do/erp-implementation">ERP Development</Link>
                        </li>
                        <li>
                          <Link to="/ai-solutions">Artificial Intelligence</Link>
                        </li>
                        <li>
                          <Link to="/solutions/office-365">Office 365</Link>
                        </li>
                        <li>
                          <Link to="/what-we-do/web-development">Web Development</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-4 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Information</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <Link to="/working-process">Working Process</Link>
                        </li>
                        <li>
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/terms-and-conditions">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link to="/faq">Faqs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tv-copyright-area ">
          <div className="container">
            <div className="tv-copyright-border">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="tv-copyright-left text-center text-lg-start">
                    <p className="mb-0">
                      © 2026 All Rights Reserved | Developed by
                      <a href="https://www.infomeya.com" target="_blank">
                        {' '}
                        Infomeya Pvt. Ltd.
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 text-end">
                  <div className="tv-footer-widget-social style-2">
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
