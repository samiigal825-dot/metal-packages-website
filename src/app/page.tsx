"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "../data/siteConfig";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  
  // Modal state for product detailed view
  const [selectedProduct, setSelectedProduct] = useState<typeof siteConfig.products[0] | null>(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [activeBannerTab, setActiveBannerTab] = useState<'profile' | 'specs'>('profile');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    if (loading) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
        setShowBannerModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct || showBannerModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, showBannerModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
        setTimeout(() => setFormStatus(""), 4000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus(""), 4000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 4000);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader-content">
          <div className="loader-logo">MPI</div>
          <div className="loader-bar"><div className="loader-bar-inner"></div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-container">
          <a href="#" className="nav-logo" onClick={() => scrollToSection("hero")}>
            <div className="nav-logo-icon">MPI</div>
            <div className="nav-logo-text">Metal <span>Packages Industries</span></div>
          </a>
          <ul className={`nav-links ${mobileMenu ? "open" : ""}`}>
            <li><a href="#about" onClick={() => scrollToSection("about")}>About</a></li>
            <li><a href="#products" onClick={() => scrollToSection("products")}>Products</a></li>
            <li><a href="#process" onClick={() => scrollToSection("process")}>Process</a></li>
            <li><a href="#quality" onClick={() => scrollToSection("quality")}>Quality</a></li>
            <li><a href="#industries" onClick={() => scrollToSection("industries")}>Industries</a></li>
            <li><a href="#contact" onClick={() => scrollToSection("contact")} className="nav-cta">Get Quote</a></li>
          </ul>
          <button
            className={`mobile-menu-btn ${mobileMenu ? "open" : ""}`}
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <Image src="/manufacturing.png" alt="Aluminium Tubes Manufacturing" fill style={{ objectFit: "cover" }} priority />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              {siteConfig.hero.badge}
            </div>
            <h1>
              {siteConfig.hero.title.part1}<br />
              <span className="highlight">{siteConfig.hero.title.part2}</span><br />
              <span className="highlight">{siteConfig.hero.title.part3}</span>
            </h1>
            <p className="hero-description">
              {siteConfig.hero.description}
            </p>
            <div className="hero-buttons">
              <a href="#contact" onClick={() => scrollToSection("contact")} className="btn-primary">
                Request a Quote →
              </a>
              <a href="#products" onClick={() => scrollToSection("products")} className="btn-secondary">
                View Products
              </a>
            </div>
            <div className="hero-stats">
              {siteConfig.hero.stats.map((stat, i) => (
                <div className="hero-stat" key={i}>
                  <div className="hero-stat-number">{stat.number}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <Image src="/hero.png" alt="Pure Metal Collapsible Tubes" width={600} height={500} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="hero-image-glow"></div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image observe" style={{ opacity: 0 }}>
              <Image src="/factory.png" alt="Our Manufacturing Facility" width={600} height={500} style={{ width: "100%", height: "auto" }} />
              <div className="about-image-overlay">
                <div className="about-experience">
                  <div className="about-exp-number">{siteConfig.company.experienceYears}+</div>
                  <div className="about-exp-text">Years of<br />Manufacturing<br />Excellence</div>
                </div>
              </div>
            </div>
            <div className="about-content observe" style={{ opacity: 0 }}>
              <div className="section-label">{siteConfig.about.label}</div>
              <h2 className="section-title">
                {siteConfig.about.title}
              </h2>
              <p>
                {siteConfig.about.paragraph1}
              </p>
              <p>
                {siteConfig.about.paragraph2}
              </p>
              <div className="about-features">
                {siteConfig.about.features.map((feature, i) => (
                  <div className="about-feature" key={i}>
                    <div className="about-feature-icon">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2rem" }}>
                <button className="btn-primary" style={{ cursor: "pointer" }} onClick={() => setShowBannerModal(true)}>
                  🔍 View Corporate Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header observe" style={{ opacity: 0 }}>
            <div className="section-label">Our Products</div>
            <h2 className="section-title">
              Flexible <span className="highlight">Aluminium</span> Collapsible Tubes
            </h2>
            <p className="section-subtitle">
              We manufacture a comprehensive range of aluminium collapsible tubes designed for various 
              applications, ensuring product integrity and brand excellence. Click on any card for specifications & datasheet.
            </p>
          </div>
          <div className="products-grid">
            {siteConfig.products.map((product, i) => (
              <div 
                className="product-card observe clickable-card" 
                style={{ opacity: 0, cursor: "pointer" }} 
                key={i}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-card-image">
                  <Image src={product.img} alt={product.title} width={400} height={250} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="product-card-badge">{product.badge}</div>
                </div>
                <div className="product-card-content">
                  <h3>{product.title}</h3>
                  <p>{product.desc}</p>
                  <div className="product-specs">
                    {product.specs.map((spec, j) => (
                      <span className="product-spec" key={j}>{spec}</span>
                    ))}
                  </div>
                  <div className="product-card-action">
                    <span>View Specifications & Datasheet</span>
                    <span className="action-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {siteConfig.statsSection.map((stat, i) => (
              <div className="stat-item observe" style={{ opacity: 0 }} key={i}>
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MANUFACTURING PROCESS ===== */}
      <section className="section section-alt" id="process">
        <div className="container">
          <div className="section-header observe" style={{ opacity: 0 }}>
            <div className="section-label">Manufacturing Process</div>
            <h2 className="section-title">
              Our <span className="highlight">9-Step</span> Production Process
            </h2>
            <p className="section-subtitle">
              Every tube undergoes a meticulous 9-step manufacturing process, ensuring precision, 
              quality, and consistency from raw material to final dispatch.
            </p>
          </div>
          <div className="process-timeline">
            <div className="process-line">
              <div className="process-line-progress" style={{ height: "100%" }}></div>
            </div>
            {siteConfig.manufacturingSteps.map((step, i) => (
              <div className="process-step observe" style={{ opacity: 0 }} key={i}>
                <div className="process-step-content">
                  <h3>{step.icon} {step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="process-step-number">{step.num}</div>
                <div style={{ flex: 1 }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section" id="why-us">
        <div className="container">
          <div className="section-header observe" style={{ opacity: 0 }}>
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title">
              The Metal Packages <span className="highlight">Advantage</span>
            </h2>
            <p className="section-subtitle">
              What sets us apart from the competition and makes us the preferred choice for aluminium packaging solutions.
            </p>
          </div>
          <div className="why-grid">
            {siteConfig.whyChooseUs.map((item, i) => (
              <div className="why-card observe" style={{ opacity: 0 }} key={i}>
                <div className="why-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUALITY ===== */}
      <section className="section section-alt" id="quality">
        <div className="container">
          <div className="quality-grid">
            <div className="quality-image observe" style={{ opacity: 0 }}>
              <Image src="/quality.png" alt="Quality Assurance" width={600} height={500} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="observe" style={{ opacity: 0 }}>
              <div className="section-label" style={{ textAlign: "left" }}>
                {siteConfig.quality.label}
              </div>
              <h2 className="section-title" style={{ textAlign: "left" }}>
                {siteConfig.quality.title}
              </h2>
              <p className="section-subtitle" style={{ textAlign: "left", marginBottom: "2rem" }}>
                {siteConfig.quality.subtitle}
              </p>
              <div className="quality-list">
                {siteConfig.quality.items.map((item, i) => (
                  <div className="quality-item" key={i}>
                    <div className="quality-check">✓</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="section" id="industries">
        <div className="container">
          <div className="section-header observe" style={{ opacity: 0 }}>
            <div className="section-label">Industries We Serve</div>
            <h2 className="section-title">
              Packaging Solutions for <span className="highlight">Every Industry</span>
            </h2>
            <p className="section-subtitle">
              Our versatile aluminium collapsible tubes serve a wide range of industries with specialized solutions.
            </p>
          </div>
          <div className="industries-grid">
            {siteConfig.industries.map((item, i) => (
              <div className="industry-card observe" style={{ opacity: 0 }} key={i}>
                <div className="industry-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CEO ===== */}
      <section className="section ceo-section">
        <div className="container">
          <div className="section-header observe" style={{ opacity: 0 }}>
            <div className="section-label">Leadership</div>
            <h2 className="section-title">
              Message from the <span className="highlight">CEO</span>
            </h2>
          </div>
          <div className="ceo-grid observe" style={{ opacity: 0 }}>
            <div className="ceo-avatar">ABK</div>
            <div className="ceo-content">
              <h3>{siteConfig.company.ceo}</h3>
              <div className="ceo-title">{siteConfig.company.ceoTitle}</div>
              <p>
                &quot;At Metal Packages Industries, our commitment to excellence drives everything we do. We believe in 
                delivering not just products, but complete packaging solutions that help our clients&apos; 
                brands stand out. With continuous investment in technology and our people, we are 
                dedicated to being your trusted partner in aluminium packaging. Our goal is to exceed 
                expectations in quality, innovation, and service.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section section-alt" id="contact">
        <div className="container">
          <div className="section-header observe" style={{ opacity: 0 }}>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">
              Contact <span className="highlight">Us</span>
            </h2>
            <p className="section-subtitle">
              Ready to discuss your packaging needs? Reach out to us for a free consultation and quote.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info observe" style={{ opacity: 0 }}>
              <div className="contact-card">
                <div className="contact-icon">👤</div>
                <div>
                  <h3>CEO</h3>
                  <p>{siteConfig.company.ceo}</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Cell Phone</h3>
                  <p><a href={`tel:${siteConfig.company.phone.replace(/[^0-9+]/g, '')}`}>{siteConfig.company.phone}</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">☎️</div>
                <div>
                  <h3>Office Phone</h3>
                  <p><a href={`tel:${siteConfig.company.officePhone.replace(/[^0-9+]/g, '')}`}>{siteConfig.company.officePhone}</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📠</div>
                <div>
                  <h3>Fax</h3>
                  <p>{siteConfig.company.fax}</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p><a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Factory Address</h3>
                  <p>{siteConfig.company.address}</p>
                </div>
              </div>
            </div>
            
            <form className="contact-form observe" style={{ opacity: 0 }} onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>
              <p>Fill out the form and our team will get back to you within 24 hours.</p>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="03XX XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="How can we help you?"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  placeholder="Tell us about your packaging requirements..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="form-submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending..." : formStatus === "success" ? "✓ Message Sent!" : formStatus === "error" ? "Error - Try Again" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <h3>Metal <span>Packages Industries</span></h3>
              <p>
                Leading manufacturer of premium quality flexible aluminium collapsible tubes. 
                Serving pharmaceutical, cosmetic, food, and industrial sectors with innovative 
                packaging solutions since over a decade.
              </p>
              <div className="footer-social">
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href={`mailto:${siteConfig.company.email}`} aria-label="Email">✉️</a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about" onClick={() => scrollToSection("about")}>→ About Us</a></li>
                <li><a href="#products" onClick={() => scrollToSection("products")}>→ Products</a></li>
                <li><a href="#process" onClick={() => scrollToSection("process")}>→ Process</a></li>
                <li><a href="#quality" onClick={() => scrollToSection("quality")}>→ Quality</a></li>
                <li><a href="#contact" onClick={() => scrollToSection("contact")}>→ Contact</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Products</h4>
              <ul>
                <li><a href="#products" onClick={() => scrollToSection("products")}>→ Pharma Tubes</a></li>
                <li><a href="#products" onClick={() => scrollToSection("products")}>→ Cosmetic Tubes</a></li>
                <li><a href="#products" onClick={() => scrollToSection("products")}>→ Food Grade Tubes</a></li>
                <li><a href="#products" onClick={() => scrollToSection("products")}>→ Industrial Tubes</a></li>
                <li><a href="#products" onClick={() => scrollToSection("products")}>→ Custom Solutions</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact Info</h4>
              <div className="footer-contact-item">
                <span>👤</span>
                <p>{siteConfig.company.ceo} (CEO)</p>
              </div>
              <div className="footer-contact-item">
                <span>📞</span>
                <p><a href={`tel:${siteConfig.company.phone.replace(/[^0-9+]/g, '')}`}>{siteConfig.company.phone}</a> (Cell)</p>
              </div>
              <div className="footer-contact-item">
                <span>☎️</span>
                <p><a href={`tel:${siteConfig.company.officePhone.replace(/[^0-9+]/g, '')}`}>{siteConfig.company.officePhone}</a> (Office)</p>
              </div>
              <div className="footer-contact-item">
                <span>📠</span>
                <p>{siteConfig.company.fax} (Fax)</p>
              </div>
              <div className="footer-contact-item">
                <span>✉️</span>
                <p><a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a></p>
              </div>
              <div className="footer-contact-item flex-start">
                <span>📍</span>
                <p className="footer-address">{siteConfig.company.address}</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {siteConfig.company.name}. All Rights Reserved.</p>
            <p>Designed with ❤️ for Quality Packaging</p>
          </div>
        </div>
      </footer>

      {/* ===== BACK TO TOP ===== */}
      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* ===== DETAILS MODAL (POPUP) ===== */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close modal">
              &times;
            </button>
            <div className="modal-body">
              <div className="modal-left">
                <div className="modal-image-wrapper">
                  <Image 
                    src={selectedProduct.img} 
                    alt={selectedProduct.title} 
                    width={500} 
                    height={350} 
                    style={{ width: "100%", height: "auto", objectFit: "cover" }} 
                  />
                  <span className="modal-badge-tag">{selectedProduct.badge}</span>
                </div>
              </div>
              <div className="modal-right">
                <h2 className="modal-title">{selectedProduct.title}</h2>
                <div className="modal-tagline">{selectedProduct.desc}</div>
                <p className="modal-long-desc">{selectedProduct.longDesc}</p>
                
                <h3 className="specs-heading">Technical Specifications</h3>
                <div className="modal-specs-table">
                  {selectedProduct.detailedSpecs.map((spec, index) => (
                    <div className="modal-spec-row" key={index}>
                      <span className="modal-spec-name">{spec.name}</span>
                      <span className="modal-spec-val">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="modal-actions-bar">
                  <a 
                    href={selectedProduct.datasheet} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="modal-btn-download"
                  >
                    <span className="btn-icon">📥</span> Download Datasheet (PDF)
                  </a>
                  <button 
                    className="modal-btn-quote" 
                    onClick={() => {
                      setSelectedProduct(null);
                      setFormData((prev) => ({
                        ...prev,
                        subject: `Inquiry: ${selectedProduct.title}`,
                        message: `Hi, we are interested in your ${selectedProduct.title}. Please provide options and pricing structure for our requirements.`
                      }));
                      scrollToSection("contact");
                      // Auto-focus on name field
                      setTimeout(() => {
                        document.getElementById("name")?.focus();
                      }, 400);
                    }}
                  >
                    <span className="btn-icon">💬</span> Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CORPORATE BANNER MODAL (POPUP) ===== */}
      {showBannerModal && (
        <div className="modal-overlay" onClick={() => setShowBannerModal(false)}>
          <div className="modal-content" style={{ maxWidth: "750px" }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBannerModal(false)} aria-label="Close modal">
              &times;
            </button>
            <div style={{ padding: "3rem 2rem 2rem", textAlign: "center" }}>
              <h2 className="modal-title" style={{ marginBottom: "1.5rem" }}>Corporate Brochure</h2>
              
              {/* Tab Selector */}
              <div className="banner-tabs">
                <button 
                  className={`banner-tab-btn ${activeBannerTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveBannerTab('profile')}
                >
                  📄 Company Profile
                </button>
                <button 
                  className={`banner-tab-btn ${activeBannerTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveBannerTab('specs')}
                >
                  📊 Technical Specifications
                </button>
              </div>

              {/* Image Display */}
              <div style={{ border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden", boxShadow: "var(--shadow-lg)", background: "#12121c" }}>
                {activeBannerTab === 'profile' ? (
                  <Image 
                    src="/banner.jpg" 
                    alt="Metal Packages Industries Standee Banner" 
                    width={600} 
                    height={900} 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                ) : (
                  <Image 
                    src="/brochure-technical.jpg" 
                    alt="Metal Packages Industries Technical Specs Standee" 
                    width={600} 
                    height={900} 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                )}
              </div>

              {/* Download Action */}
              <div style={{ marginTop: "1.5rem" }}>
                <a 
                  href={activeBannerTab === 'profile' ? '/banner.jpg' : '/brochure-technical.jpg'} 
                  download={activeBannerTab === 'profile' ? 'Metal-Packages-Industries-Profile.jpg' : 'Metal-Packages-Industries-Technical-Specs.jpg'} 
                  className="btn-primary" 
                  style={{ cursor: "pointer" }}
                >
                  📥 Download Active Page
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
