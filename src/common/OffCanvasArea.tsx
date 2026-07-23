import { Link } from 'react-router-dom';
import MobileMenu from '../layouts/headers/MobileMenu';

interface OffCanvasAreaProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OffCanvasArea({
  menuOpen,
  setMenuOpen,
}: OffCanvasAreaProps) {
  return (
    <>
      <div className="tv-offcanvas-area">
        <div className={`itoffcanvas ${menuOpen ? 'opened' : ''}`}>
          <div className="itoffcanvas__close-btn">
            <button onClick={() => setMenuOpen(false)} className="close-btn">
              <i className="fal fa-times"></i>
            </button>
          </div>
          <div className="itoffcanvas__logo">
            <Link to="/">
              <img src="../../assets/img/logo/InfomeyaLogo.jpeg" alt="" />
            </Link>
          </div>
          <div className="itoffcanvas__text">
            <p>
              Delivering innovative ERP, CRM, Azure, and Power Platform
              services to help businesses accelerate digital transformation and
              achieve measurable success.
            </p>
          </div>
          <div className="tv-menu-mobile d-xl-none">
            <MobileMenu />
          </div>
          <div className="itoffcanvas__info">
            <h3 className="offcanva-title">Get In Touch</h3>
            <div className="tv-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fal fa-envelope"></i>
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Email</span>
                <a href="mailto:ramprasad.mani@infomeya.com">ramprasad.mani@infomeya.com</a>
              </div>
            </div>
            {/* <div className="tv-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fal fa-phone-alt"></i>
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Phone</span>
                <a href="tel:(+91) 80-8181-0673,(+91) 82-9915-6511">(+91) 80-8181-0673, (+91) 82-9915-6511
                </a>
              </div>
            </div> */}
            <div className="tv-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i>
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Location</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1+Commonwealth+Lane+%2306-17+One+Commonwealth+Singapore+149544"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1 Commonwealth Lane, #06-17, One Commonwealth, Singapore (149544)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${menuOpen ? 'apply' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
}
