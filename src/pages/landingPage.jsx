import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingPage.css";
import {
  FaIdCard,
  FaHandshake,
  FaUserTie,
  FaUsers,
  FaTheaterMasks,
  FaShieldAlt,
  FaRunning,
  FaPlus,
  FaDownload,
  FaEllipsisV,
  FaShareSquare
} from "react-icons/fa";

const services = [
  { 
    icon: <FaIdCard />, 
    title: "Admission and Enrollment", 
    description: "Streamline your enrollment process. Submit requirements, track your application status, and get officially admitted to the university digital platform." 
  },
  { 
    icon: <FaHandshake />, 
    title: "Scholarship and Financial Assistance", 
    description: "Explore various financial aid opportunities. Apply for campus scholarships and manage your grants to support your academic journey." 
  },
  { 
    icon: <FaUserTie />, 
    title: "Guidance and Counseling", 
    description: "Access professional support for personal and academic growth. Schedule sessions with counselors and participate in wellness programs." 
  },
  { 
    icon: <FaUsers />, 
    title: "Student Organization Development", 
    description: "Engage with campus life. Register student organizations, manage events, and foster leadership within the university community." 
  },
  { 
    icon: <FaTheaterMasks />, 
    title: "Cultural and Arts Programs", 
    description: "Nurture your artistic talents. Join cultural groups, stay updated on arts events, and participate in various creative university initiatives." 
  },
  { 
    icon: <FaShieldAlt />, 
    title: "Safety and Security Services", 
    description: "Ensuring a safe environment for everyone. Request assistance, report concerns, and access emergency services within the campus." 
  },
  { 
    icon: <FaRunning />, 
    title: "Sports Development", 
    description: "Promoting physical excellence. Join varsity teams, register for sports events, and access university athletic facilities and training." 
  },
];

const faqs = [
  "Is my personal data secure?",
  "How can I stay updated with announcements and events?",
  "What student services can I access through USTeS?",
  "How can I stay updated with announcements and events?",
];

export default function LandingPage() {
  const [open, setOpen] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bannerDismissed, setBannerDismissed] = useState(localStorage.getItem("pwaDismissed") === "true");
  const servicesRef = useRef(null);

  // Toggles individual service expansion state
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Check if the app is running in standalone mode (installed PWA)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    setIsStandalone(standalone);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    if (!standalone && !bannerDismissed) {
      setShowInstallBanner(true);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!bannerDismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowInstructions(true);
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const dismissBanner = () => {
    setShowInstallBanner(false);
    setBannerDismissed(true);
    localStorage.setItem("pwaDismissed", "true");
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* PWA INSTALL BANNER */}
      {showInstallBanner && !isStandalone && (
        <div className="pwa-install-banner">
          <div className="pwa-info">
            <div className="pwa-logo">UST<span>e</span>S</div>
            <p>{isMobile ? "Add USTeS to your home screen" : "Install our app for a faster experience!"}</p>
          </div>
          <div className="pwa-actions">
            <button 
              className="pwa-install-btn" 
              onClick={handleInstallClick}
              aria-label={isMobile ? "Add to Home Screen" : "Install App"}
            >
              <FaDownload /> {isMobile ? "Add to Home Screen" : "Install App"}
            </button>
            <button className="pwa-close-btn" onClick={dismissBanner}>&times;</button>
          </div>
        </div>
      )}

      {/* HOW TO INSTALL MODAL (FALLBACK) */}
      {showInstructions && (
        <div className="pwa-modal-overlay" onClick={() => setShowInstructions(false)}>
          <div className="pwa-modal-content" onClick={e => e.stopPropagation()}>
            <button className="pwa-modal-close" onClick={() => setShowInstructions(false)}>&times;</button>
            <div className="pwa-modal-icon"><FaDownload /></div>
            <h3>Add to Home Screen</h3>
            <p className="pwa-modal-desc">To install USTeS on your device, follow these simple steps:</p>
            
            <div className="pwa-steps-list">
              <div className="pwa-step">
                <span className="step-count">1</span>
                <p>Open your browser menu (tap <FaEllipsisV /> or <FaShareSquare />)</p>
              </div>
              <div className="pwa-step">
                <span className="step-count">2</span>
                <p>Tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong></p>
              </div>
            </div>
            <button className="pwa-got-it" onClick={() => setShowInstructions(false)}>Got it!</button>
          </div>
        </div>
      )}

      {/* PWA FLOATING INSTALL BUTTON */}
      {isMobile && !showInstallBanner && !isStandalone && (
        <button className="pwa-floating-btn" onClick={handleInstallClick} aria-label={isMobile ? "Add to Home Screen" : "Install App"}>
          <FaDownload />
        </button>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <span className="badge">
            WELCOME TO THE FUTURE OF CAMPUS LIFE
          </span>

          <h1>
            Connecting Students,
            <br />
            <span>Streamlining Services.</span>
          </h1>

          <p>
            Your all-in-one digital platform for Student Affairs and Services
            at the University of Science and Technology of Southern Philippines
            – Villanueva Campus. Stay updated, access services, and connect
            with campus activities anytime, anywhere.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/login")}>Get Started</button>
            <button className="secondary-btn" onClick={scrollToServices}>
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section scroll-reveal" ref={servicesRef}>
        <h2>Services</h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              
              <div className="service-description-visible">
                <div className="service-description">
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPDATES */}
      <section id="updates" className="updates-section scroll-reveal">
        <div className="updates-header">
          <div>
            <h2>Campus Buzz & Updates</h2>
            <p>
              Catch up with the latest events and stories from our dynamic
              student community.
            </p>
          </div>

          <a href="/login">View all updates    →</a>
        </div>

        <div className="updates-grid">
          <div className="news-card">
            <img
              src="https://via.placeholder.com/400x220"
              alt="Founders Day"
            />
            <div className="news-content">
              <small>EVENT</small>
              <h3>Founders Day Celebration 2024</h3>
              <p>
                Join us for a week of heritage, sports, and cultural
                presentations.
              </p>
              <span>October 12, 2024</span>
            </div>
          </div>

          <div className="news-card">
            <img
              src="https://via.placeholder.com/400x220"
              alt="Student Lounge"
            />
            <div className="news-content">
              <small>CAMPUS NEWS</small>
              <h3>New Student Lounge Unveiled</h3>
              <p>
                The Student Affairs office is proud to open the new 24/7
                learning hub.
              </p>
              <span>September 28, 2024</span>
            </div>
          </div>

          <div className="contribute-card">
            <h3>Want to contribute?</h3>

            <p>
              We are always looking for student writers, photographers, and
              campus leaders to join our editorial team.
            </p>

            <button onClick={() => navigate("/login")}>Apply Now</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section scroll-reveal">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${open === index ? "active" : ""}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              <div className="faq-question">
                <span>{faq}</span>
                <FaPlus className="faq-icon" />
              </div>

              <div className="faq-answer-container">
                <div className="faq-answer">
                  Information related to {faq.toLowerCase()}.
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
    <footer>
    <div className="footer-container">
        <div className="footer-column">
        <div className="logo">UST<span>e</span>S</div>
        <p>The official Student Affairs and Services Portal of the University of Science and Technology of Southern Philippines – Villanueva Campus.</p>
        </div>
        
        <div className="footer-column">
        <h3>Quick Links</h3>
        <ul>
            <li><a href="https://www.ustp.edu.ph/about-ustp/the-ustp-profile/" target="_blank" rel="noopener noreferrer">About USTP</a></li>
            <li><a href="https://www.ustp.edu.ph/wp-content/uploads/2021/03/STUDENT-HANDBOOK-2021-EDITION.pdf" target="_blank" rel="noopener noreferrer">Student Handbook</a></li>
            <li><a href="https://www.ustp.edu.ph/university-calendars/" target="_blank" rel="noopener noreferrer">Academic Calendar</a></li>
            <li><a href="https://www.ustp.edu.ph/dto/policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
        </ul>
        </div>

        <div className="footer-column">
        <h3>Contact Us</h3>
        <p>Villanueva, Misamis Oriental, Philippines</p>
        <p>Email: support.ustes@ustp.edu.ph</p>
        </div>
    </div>
    
    <hr className="footer-divider" />
    
    <div className="footer-bottom">
        <p>© 2026 USTP Villanueva. All rights reserved.</p>
    </div>
    </footer>
    </div>
  );
}