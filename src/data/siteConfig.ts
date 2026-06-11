export const siteConfig = {
  company: {
    name: "Metal Packages Industries",
    shortName: "Metal Packages",
    tagline: "Manufacturers of Aluminium Collapsible Tubes",
    ceo: "Abdul Basit Khan",
    ceoTitle: "Chief Executive Officer",
    address: "78/A, Old # 4/2, Sector 5/D, Jam Sab Road, Saeedabad, Baldia Town, Karachi, Pakistan",
    phone: "0345-8222808",
    officePhone: "0311-2888535",
    fax: "021-32815885",
    email: "metalpackages@hotmail.com",
    businessHours: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed",
    experienceYears: 15,
  },
  hero: {
    badge: "Premium Aluminium Packaging Solutions",
    title: {
      part1: "Crafting Precision",
      part2: "Aluminium Collapsible",
      part3: "Tubes",
    },
    description: "Metal Packages Industries is a premier manufacturer of high-quality flexible aluminium collapsible tubes, serving pharmaceutical, cosmetic, food, and industrial sectors with world-class packaging solutions.",
    stats: [
      { number: "15+", label: "Years Experience" },
      { number: "500+", label: "Clients Served" },
      { number: "10M+", label: "Tubes Produced" }
    ]
  },
  about: {
    label: "About Us",
    title: "Leaders in Aluminium Packaging Innovation",
    paragraph1: "Metal Packages Industries is a trusted name in the manufacturing of high-quality flexible aluminium collapsible tubes. With over 15 years of industry experience, we have established ourselves as a reliable partner for businesses seeking premium packaging solutions.",
    paragraph2: "Our state-of-the-art manufacturing facility in Karachi is equipped with modern machinery and technology, enabling us to produce tubes that meet the highest international quality standards. We serve diverse industries including pharmaceuticals, cosmetics, food & beverages, and industrial applications.",
    features: [
      { icon: "🏭", text: "Modern Facility" },
      { icon: "🌍", text: "Global Standards" },
      { icon: "🔬", text: "R&D Excellence" },
      { icon: "🤝", text: "Trusted Partner" }
    ]
  },
  products: [
    {
      id: "pharma",
      title: "Pharmaceutical Tubes",
      badge: "Pharma Grade",
      desc: "Specially designed aluminium collapsible tubes for ointments, creams, gels, and topical medications with internal lacquer coating for product protection.",
      longDesc: "Our Pharmaceutical Tubes are manufactured in clean, controlled environments complying with GMP requirements. They feature specialized internal lacquers (epoxy phenolic resins) that form a highly protective barrier between the product formulation and the aluminium tube body, preventing oxidation or degradation of the medicine. The tubes are available with latex or sealants at the folded end to prevent leakage and guarantee shelf-life integrity.",
      specs: ["5ml - 30ml", "Internal Lacquer", "Tamper Evident", "FDA Compliant"],
      detailedSpecs: [
        { name: "Diameter Range", value: "13.5mm to 30mm" },
        { name: "Capacity", value: "5ml to 30ml" },
        { name: "Internal Lacquer", value: "Double-coated Epoxy Phenolic resin (Pharma grade)" },
        { name: "Nozzle Type", value: "Standard screw thread / Tamper-evident membrane / Ophthalmic long nozzle" },
        { name: "Capping Options", value: "Conical cap / Flower cap / Piercing cap / Stand-up cap" },
        { name: "Latex Lining", value: "End band latexing available for enhanced seal security" }
      ],
      datasheet: "/datasheets/pharmaceutical-tubes-datasheet.pdf",
      img: "/products.png"
    },
    {
      id: "cosmetic",
      title: "Cosmetic & Beauty Tubes",
      badge: "Premium",
      desc: "Elegant and eye-catching aluminium tubes for hair colors, lotions, creams, and beauty products with premium offset printing.",
      longDesc: "Metal Packages Industries designs and manufactures cosmetic-grade aluminium collapsible tubes that emphasize branding, aesthetics, and user experience. With our advanced multi-color offset printing technology, we reproduce complex brand logos, gradient colors, and text with crisp precision. These tubes are 100% recyclable, catering to modern eco-conscious beauty brands looking for premium, premium-feeling metal packaging.",
      specs: ["10ml - 100ml", "Multi-Color Print", "Custom Design", "Luxury Finish"],
      detailedSpecs: [
        { name: "Diameter Range", value: "16mm to 40mm" },
        { name: "Capacity", value: "10ml to 100ml" },
        { name: "Printing", value: "Up to 6-color offset printing with glossy or matte top varnish" },
        { name: "Nozzle Type", value: "Open nozzle / Sealed membrane / Long nozzle" },
        { name: "Cap Designs", value: "Luxury round cap / Hexagonal cap / Octagonal cap / Stand-up cap" },
        { name: "Aesthetics", value: "Metallic shimmer, custom shoulder coating options" }
      ],
      datasheet: "/datasheets/cosmetic-tubes-datasheet.pdf",
      img: "/hero.png"
    },
    {
      id: "food-industrial",
      title: "Food & Industrial Tubes",
      badge: "Food Safe",
      desc: "Food-grade aluminium collapsible tubes for pastes, adhesives, sealants, and industrial applications with specialized barrier coatings.",
      longDesc: "Our Food & Industrial Tubes offer high chemical resistance and exceptional barrier protection. For food products (spreads, tomato paste, purees), we use food-safe, non-toxic internal coatings. For industrial products (silicone sealants, strong adhesives, lubricants, paints), we use heavy-duty liners capable of resisting aggressive chemical formulas, ensuring the product does not cure or degrade inside the tube during storage.",
      specs: ["15ml - 200ml", "Food Grade", "Barrier Coating", "Chemical Resistant"],
      detailedSpecs: [
        { name: "Diameter Range", value: "19mm to 45mm" },
        { name: "Capacity", value: "15ml to 200ml" },
        { name: "Material", value: "99.7% pure refined aluminium slugs" },
        { name: "Resin Integrity", value: "High-temperature chemical barrier coatings" },
        { name: "Cap Style", value: "Heavy-duty ribbed screw cap / Piercing cap" },
        { name: "Eco-Compliance", value: "100% recyclable, high barrier properties reduce product waste" }
      ],
      datasheet: "/datasheets/food-industrial-tubes-datasheet.pdf",
      img: "/manufacturing.png"
    }
  ],
  statsSection: [
    { num: "15+", label: "Years of Experience" },
    { num: "500+", label: "Satisfied Clients" },
    { num: "10M+", label: "Tubes Produced Annually" },
    { num: "99.5%", label: "Quality Rate" }
  ],
  manufacturingSteps: [
    { num: "01", title: "Aluminium Slugs", desc: "High-purity aluminium slugs are precision-cut as the foundational raw material for tube production.", icon: "🔘" },
    { num: "02", title: "Impact Extrusion", desc: "Slugs are formed into seamless tube shells using high-pressure impact extrusion technology.", icon: "⚡" },
    { num: "03", title: "Annealing", desc: "Heat treatment process to achieve optimal flexibility and malleability of the aluminium tubes.", icon: "🔥" },
    { num: "04", title: "Internal Coating", desc: "Food-grade epoxy coating applied inside to protect contents and ensure product integrity.", icon: "🛡️" },
    { num: "05", title: "Base Coating", desc: "External base coat applied for smooth surface preparation before decorative printing.", icon: "🎨" },
    { num: "06", title: "Offset Printing", desc: "High-resolution multi-color offset printing for brand graphics, text, and regulatory information.", icon: "🖨️" },
    { num: "07", title: "Capping", desc: "Precision-engineered caps are fitted and secured for leak-proof product sealing.", icon: "🔧" },
    { num: "08", title: "Quality Inspection", desc: "Rigorous multi-point quality checks ensuring every tube meets international standards.", icon: "✅" },
    { num: "09", title: "Packaging & Dispatch", desc: "Carefully packaged in protective materials and dispatched for timely delivery to clients.", icon: "📦" }
  ],
  whyChooseUs: [
    { icon: "🏆", title: "Premium Quality", desc: "Every tube is manufactured to meet international quality standards with rigorous quality control at each stage." },
    { icon: "⚙️", title: "Advanced Technology", desc: "State-of-the-art machinery and equipment ensuring precision manufacturing and consistent output." },
    { icon: "🎯", title: "Custom Solutions", desc: "Tailored tube specifications including sizes, coatings, printing designs, and cap options to match your needs." },
    { icon: "🚀", title: "On-Time Delivery", desc: "Efficient production planning and logistics ensuring timely delivery of every order, every time." },
    { icon: "💰", title: "Competitive Pricing", desc: "Best-in-class pricing without compromising on quality, helping you maximize your packaging ROI." },
    { icon: "🔒", title: "Product Safety", desc: "Internal coatings and barrier technologies that protect your products from contamination and degradation." },
    { icon: "🌱", title: "Eco-Friendly", desc: "Aluminium is 100% recyclable. Our tubes are environmentally responsible packaging solutions." },
    { icon: "📞", title: "Dedicated Support", desc: "Responsive customer service team to assist you from initial inquiry through post-delivery support." }
  ],
  quality: {
    label: "Quality Assurance",
    title: "Committed to Excellence",
    subtitle: "Our quality management system ensures that every product meets the highest international standards.",
    items: [
      { title: "ISO 9001:2015 Certified", desc: "Quality management system certified to international standards." },
      { title: "GMP Compliant", desc: "Good Manufacturing Practices followed across all production stages." },
      { title: "Raw Material Testing", desc: "Every batch of aluminium slugs tested for purity and composition." },
      { title: "In-Process Quality Checks", desc: "Multi-point inspections during each manufacturing step." },
      { title: "Final Product Testing", desc: "Comprehensive testing for dimensions, coating, print quality, and seal integrity." },
      { title: "Traceability System", desc: "Complete batch traceability from raw material to finished product." }
    ]
  },
  industries: [
    { icon: "💊", title: "Pharmaceuticals", desc: "Ointments, creams, gels, topical medications, and medicinal pastes." },
    { icon: "💄", title: "Cosmetics & Beauty", desc: "Hair colors, skin creams, lotions, sunscreens, and beauty products." },
    { icon: "🍴", title: "Food & Beverage", desc: "Tomato paste, condiments, mayonnaise, and food-grade pastes." },
    { icon: "🔧", title: "Industrial", desc: "Adhesives, sealants, lubricants, and industrial compounds." },
    { icon: "🎨", title: "Paints & Colors", desc: "Artist paints, watercolors, and specialty color products." },
    { icon: "🏥", title: "Veterinary", desc: "Animal health products, veterinary ointments, and treatments." },
    { icon: "🦷", title: "Dental Care", desc: "Toothpaste, oral gels, and dental care products." },
    { icon: "🧴", title: "Personal Care", desc: "Hand creams, shaving creams, and personal hygiene products." }
  ]
};
