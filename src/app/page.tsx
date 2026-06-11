"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

  const manufacturingSteps = [
    { num: "01", title: "Aluminium Slugs", desc: "High-purity aluminium slugs are precision-cut as the foundational raw material for tube production.", icon: "🔘" },
    { num: "02", title: "Impact Extrusion", desc: "Slugs are formed into seamless tube shells using high-pressure impact extrusion technology.", icon: "⚡" },
    { num: "03", title: "Annealing", desc: "Heat treatment process to achieve optimal flexibility and malleability of the aluminium tubes.", icon: "🔥" },
    { num: "04", title: "Internal Coating", desc: "Food-grade epoxy coating applied inside to protect contents and ensure product integrity.", icon: "🛡️" },
    { num: "05", title: "Base Coating", desc: "External base coat applied for smooth surface preparation before decorative printing.", icon: "🎨" },
    { num: "06", title: "Offset Printing", desc: "High-resolution multi-color offset printing for brand graphics, text, and regulatory information.", icon: "🖨️" },
    { num: "07", title: "Capping", desc: "Precision-engineered caps are fitted and secured for leak-proof product sealing.", icon: "🔧" },
    { num: "08", title: "Quality Inspection", desc: "Rigorous multi-point quality checks ensuring every tube meets international standards.", icon: "✅" },
    { num: "09", title: "Packaging & Dispatch", desc: "Carefully packaged in protective materials and dispatched for timely delivery to clients.", icon: "📦" },
  ];

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader-content">
          <div className="loader-logo">MP</div>
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
            <div className="nav-logo-icon">MP</div>
            <div className="nav-logo-text">Metal <span>Packages</span></div>
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
          <Image src="/hero.png" alt="Aluminium Tubes" fill style={{ objectFit: "cover" }} priority />
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
              Premium Aluminium Packaging Solutions
            </div>
            <h1>
              Crafting <span className="highlight">Precision</span><br />
              Aluminium Collapsible<br />
              <span className="highlight">Tubes</span>
            </h1>
            <p className="hero-description">
              Metal Packages is a premier manufacturer of high-quality flexible aluminium collapsible tubes, 
              serving pharmaceutical, cosmetic, food, and industrial sectors with world-class packaging solutions.
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
              <div className="hero-stat">
                <div className="hero-stat-number">15+</div>
                <div className="hero-stat-label">Years Experience</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Clients Served</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">10M+</div>
                <div className="hero-stat-label">Tubes Produced</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <Image src="/products.png" alt="Product Range" width={600} height={500} style={{ width: "100%", height: "auto" }} />
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
                  <div className="about-exp-number">15+</div>
                  <div className="about-exp-text">Years of<br />Manufacturing<br />Excellence</div>
                </div>
              </div>
            </div>
            <div className="about-content observe" style={{ opacity: 0 }}>
              <div className="section-label">About Us</div>
              <h2 className="section-title">
                Leaders in <span className="highlight">Aluminium Packaging</span> Innovation
              </h2>
              <p>
                Metal Packages is a trusted name in the manufacturing of high-quality flexible aluminium 
                collapsible tubes. With over 15 years of industry experience, we have established ourselves 
                as a reliable partner for businesses seeking premium packaging solutions.
              </p>
              <p>
                Our state-of-the-art manufacturing facility is equipped with modern machinery and 
                technology, enabling us to produce tubes that meet the highest international quality 
                standards. We serve diverse industries including pharmaceuticals, cosmetics, food & 
                beverages, and industrial applications.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">🏭</div>
                  <span>Modern Facility</span>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🌍</div>
                  <span>Global Standards</span>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🔬</div>
                  <span>R&D Excellence</span>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🤝</div>
                  <span>Trusted Partner</span>
                </div>
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
              applications, ensuring product integrity and brand excellence.
            </p>
          </div>
          <div className="products-grid">
            {[
              {
                title: "Pharmaceutical Tubes",
                desc: "Specially designed aluminium collapsible tubes for ointments, creams, gels, and topical medications with internal lacquer coating for product protection.",
                badge: "Pharma Grade",
                specs: ["5ml - 30ml", "Internal Lacquer", "Tamper Evident", "FDA Compliant"],
                img: "/products.png",
              },
              {
                title: "Cosmetic & Beauty Tubes",
                desc: "Elegant and eye-catching aluminium tubes for hair colors, lotions, creams, and beauty products with premium offset printing.",
                badge: "Premium",
                specs: ["10ml - 100ml", "Multi-Color Print", "Custom Design", "Luxury Finish"],
                img: "/hero.png",
              },
              {
                title: "Food & Industrial Tubes",
                desc: "Food-grade aluminium collapsible tubes for pastes, adhesives, sealants, and industrial applications with specialized barrier coatings.",
                badge: "Food Safe",
                specs: ["15ml - 200ml", "Food Grade", "Barrier Coating", "Chemical Resistant"],
                img: "/manufacturing.png",
              },
            ].map((product, i) => (
              <div className="product-card observe" style={{ opacity: 0 }} key={i}>
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
            {[
              { num: "15+", label: "Years of Experience" },
              { num: "500+", label: "Satisfied Clients" },
              { num: "10M+", label: "Tubes Produced Annually" },
              { num: "99.5%", label: "Quality Rate" },
            ].map((stat, i) => (
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
            {manufacturingSteps.map((step, i) => (
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
            {[
              { icon: "🏆", title: "Premium Quality", desc: "Every tube is manufactured to meet international quality standards with rigorous quality control at each stage." },
              { icon: "⚙️", title: "Advanced Technology", desc: "State-of-the-art machinery and equipment ensuring precision manufacturing and consistent output." },
              { icon: "🎯", title: "Custom Solutions", desc: "Tailored tube specifications including sizes, coatings, printing designs, and cap options to match your needs." },
              { icon: "🚀", title: "On-Time Delivery", desc: "Efficient production planning and logistics ensuring timely delivery of every order, every time." },
              { icon: "💰", title: "Competitive Pricing", desc: "Best-in-class pricing without compromising on quality, helping you maximize your packaging ROI." },
              { icon: "🔒", title: "Product Safety", desc: "Internal coatings and barrier technologies that protect your products from contamination and degradation." },
              { icon: "🌱", title: "Eco-Friendly", desc: "Aluminium is 100% recyclable. Our tubes are environmentally responsible packaging solutions." },
              { icon: "📞", title: "Dedicated Support", desc: "Responsive customer service team to assist you from initial inquiry through post-delivery support." },
            ].map((item, i) => (
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
                Quality Assurance
              </div>
              <h2 className="section-title" style={{ textAlign: "left" }}>
                Committed to <span className="highlight">Excellence</span>
              </h2>
              <p className="section-subtitle" style={{ textAlign: "left", marginBottom: "2rem" }}>
                Our quality management system ensures that every product meets the highest international standards.
              </p>
              <div className="quality-list">
                {[
                  { title: "ISO 9001:2015 Certified", desc: "Quality management system certified to international standards." },
                  { title: "GMP Compliant", desc: "Good Manufacturing Practices followed across all production stages." },
                  { title: "Raw Material Testing", desc: "Every batch of aluminium slugs tested for purity and composition." },
                  { title: "In-Process Quality Checks", desc: "Multi-point inspections during each manufacturing step." },
                  { title: "Final Product Testing", desc: "Comprehensive testing for dimensions, coating, print quality, and seal integrity." },
                  { title: "Traceability System", desc: "Complete batch traceability from raw material to finished product." },
                ].map((item, i) => (
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
            {[
              { icon: "💊", title: "Pharmaceuticals", desc: "Ointments, creams, gels, topical medications, and medicinal pastes." },
              { icon: "💄", title: "Cosmetics & Beauty", desc: "Hair colors, skin creams, lotions, sunscreens, and beauty products." },
              { icon: "🍴", title: "Food & Beverage", desc: "Tomato paste, condiments, mayonnaise, and food-grade pastes." },
              { icon: "🔧", title: "Industrial", desc: "Adhesives, sealants, lubricants, and industrial compounds." },
              { icon: "🎨", title: "Paints & Colors", desc: "Artist paints, watercolors, and specialty color products." },
              { icon: "🏥", title: "Veterinary", desc: "Animal health products, veterinary ointments, and treatments." },
              { icon: "🦷", title: "Dental Care", desc: "Toothpaste, oral gels, and dental care products." },
              { icon: "🧴", title: "Personal Care", desc: "Hand creams, shaving creams, and personal hygiene products." },
            ].map((item, i) => (
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
              <h3>Abdul Basit Khan</h3>
              <div className="ceo-title">Chief Executive Officer</div>
              <p>
                &quot;At Metal Packages, our commitment to excellence drives everything we do. We believe in 
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
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p><a href="tel:+923458222808">+92 345 822 2808</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:metalpackages@hotmail.com">metalpackages@hotmail.com</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>Metal Packages Manufacturing Facility,<br />Pakistan</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">🕐</div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
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
                    placeholder="+92 XXX XXXXXXX"
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
              <h3>Metal <span>Packages</span></h3>
              <p>
                Leading manufacturer of premium quality flexible aluminium collapsible tubes. 
                Serving pharmaceutical, cosmetic, food, and industrial sectors with innovative 
                packaging solutions since over a decade.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="mailto:metalpackages@hotmail.com" aria-label="Email">✉️</a>
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
                <li><a href="#products">→ Pharma Tubes</a></li>
                <li><a href="#products">→ Cosmetic Tubes</a></li>
                <li><a href="#products">→ Food Grade Tubes</a></li>
                <li><a href="#products">→ Industrial Tubes</a></li>
                <li><a href="#products">→ Custom Solutions</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact Info</h4>
              <div className="footer-contact-item">
                <span>👤</span>
                <p>Abdul Basit Khan (CEO)</p>
              </div>
              <div className="footer-contact-item">
                <span>📞</span>
                <p><a href="tel:+923458222808">+92 345 822 2808</a></p>
              </div>
              <div className="footer-contact-item">
                <span>✉️</span>
                <p><a href="mailto:metalpackages@hotmail.com">metalpackages@hotmail.com</a></p>
              </div>
              <div className="footer-contact-item">
                <span>📍</span>
                <p>Pakistan</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Metal Packages. All Rights Reserved.</p>
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
    </>
  );
}
