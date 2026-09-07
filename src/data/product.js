// --- PRODUCT CATALOG ---
export const initialProducts = [
  // Laptops
  {
    id: 101,
    name: "MacBook Air M4 - Midnight Black",
    price: 119990,
    originalPrice: 134990,
    discountPercent: 11,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Supercharged by the next-generation M4 chip, offering blazing performance, up to 18 hours of battery life, and a stunning Liquid Retina display.",
    category: "Laptop",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 248,
    badge: "Best Seller",
    stockCount: 12,
    specs: {
      "Processor": "Apple M4 10-core CPU",
      "RAM": "16GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "13.6-inch Liquid Retina with True Tone",
      "Battery": "Up to 18 hours",
      "Weight": "1.24 kg"
    },
    reviews: [
      { id: 1, user: "Aarav Sharma", rating: 5, date: "2 days ago", comment: "Incredible speed and battery life! The midnight color looks ultra premium." },
      { id: 2, user: "Priya Patel", rating: 5, date: "1 week ago", comment: "Best laptop for developers and creators. Super lightweight." }
    ]
  },
  {
    id: 102,
    name: "MacBook Air M4 - Starlight Gold",
    price: 124990,
    originalPrice: 139990,
    discountPercent: 10,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Elegantly finished in Starlight Gold, equipped with the M4 neural engine, 1080p FaceTime HD camera, and spatial audio speakers.",
    category: "Laptop",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 182,
    badge: "Trending",
    stockCount: 8,
    specs: {
      "Processor": "Apple M4 10-core CPU",
      "RAM": "16GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "15.3-inch Liquid Retina",
      "Battery": "Up to 18 hours",
      "Weight": "1.51 kg"
    },
    reviews: [
      { id: 1, user: "Vikram Singhania", rating: 5, date: "3 days ago", comment: "The gold finish is subtle and classy. Silent cooling is amazing." }
    ]
  },
  {
    id: 104,
    name: "HP Pavilion Plus 14 - Intel Core i7 13th Gen",
    price: 74990,
    originalPrice: 89990,
    discountPercent: 16,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Engineered for creators and professionals with 2.8K OLED display, 13th Gen Intel Core i7 processor, and dual fan cooling system.",
    category: "Laptop",
    brand: "HP",
    rating: 4.6,
    reviewCount: 95,
    badge: "Value Pick",
    stockCount: 15,
    specs: {
      "Processor": "Intel Core i7-1355U",
      "RAM": "16GB LPDDR5x",
      "Storage": "1TB PCIe NVMe M.2 SSD",
      "Display": "14-inch 2.8K OLED 120Hz",
      "Graphics": "Intel Iris Xe",
      "Weight": "1.4 kg"
    },
    reviews: [
      { id: 1, user: "Rohan Verma", rating: 4, date: "2 weeks ago", comment: "The OLED screen is punchy and vibrant. Great typing experience." }
    ]
  },
  {
    id: 105,
    name: "ASUS ROG Zephyrus G16 Gaming Laptop",
    price: 164990,
    originalPrice: 189990,
    discountPercent: 13,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Ultimate AAA gaming powerhouse with RTX 4070, Intel Core Ultra 9, OLED ROG Nebula display, and CNC aluminum chassis.",
    category: "Laptop",
    brand: "ASUS",
    rating: 4.9,
    reviewCount: 110,
    badge: "Hot Deal",
    stockCount: 5,
    specs: {
      "Processor": "Intel Core Ultra 9 185H",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB Gen4 SSD",
      "Display": "16-inch 2.5K OLED 240Hz 0.2ms",
      "Weight": "1.85 kg"
    },
    reviews: [
      { id: 1, user: "Karan Malhotra", rating: 5, date: "5 days ago", comment: "Runs Cyberpunk at ultra settings effortlessly. OLED screen is perfection!" }
    ]
  },

  // Phones
  {
    id: 201,
    name: "iPhone 16 Pro Max - Natural Titanium",
    price: 144900,
    originalPrice: 159900,
    discountPercent: 9,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Featuring a grade 5 titanium design, Camera Control, 4K 120 fps Dolby Vision, and the breakthrough A18 Pro chip.",
    category: "Phone",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 420,
    badge: "Best Seller",
    stockCount: 14,
    specs: {
      "Chip": "A18 Pro Chip with 6-core GPU",
      "Display": "6.9-inch Super Retina XDR OLED ProMotion",
      "Camera": "48MP Fusion + 48MP Ultra Wide + 5x Telephoto",
      "Battery": "Up to 33 hours video playback",
      "Material": "Titanium with Ceramic Shield front"
    },
    reviews: [
      { id: 1, user: "Neha Gupta", rating: 5, date: "Yesterday", comment: "Camera button is super handy. Natural titanium looks stunning in person!" },
      { id: 2, user: "Sameer Joshi", rating: 5, date: "4 days ago", comment: "Battery easily lasts almost two full days of heavy usage." }
    ]
  },
  {
    id: 202,
    name: "Samsung Galaxy S24 Ultra 5G - Titanium Gray",
    price: 129999,
    originalPrice: 144999,
    discountPercent: 10,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Welcome to the era of Galaxy AI. Capture 200MP stunning details, zoom with 100x Space Zoom, and create with the built-in S Pen.",
    category: "Phone",
    brand: "Samsung",
    rating: 4.8,
    reviewCount: 310,
    badge: "Hot Deal",
    stockCount: 9,
    specs: {
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM": "12GB",
      "Storage": "512GB",
      "Display": "6.8-inch Dynamic AMOLED 2X Flat 120Hz 2600 nits",
      "Camera": "200MP + 50MP + 12MP + 10MP Quad Camera",
      "Battery": "5000 mAh with 45W Fast Charging"
    },
    reviews: [
      { id: 1, user: "Aditya Roy", rating: 5, date: "1 week ago", comment: "Galaxy AI features and flat anti-reflective screen are game changers." }
    ]
  },
  {
    id: 203,
    name: "Google Pixel 9 Pro XL - Obsidian",
    price: 109999,
    originalPrice: 124999,
    discountPercent: 12,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The most powerful Pixel yet with Google Tensor G4, Gemini Live AI on-device, and studio-quality triple camera system.",
    category: "Phone",
    brand: "Google",
    rating: 4.7,
    reviewCount: 165,
    badge: "New Arrival",
    stockCount: 11,
    specs: {
      "Processor": "Google Tensor G4 with Titan M2",
      "RAM": "16GB",
      "Storage": "256GB",
      "Display": "6.8-inch Super Actua OLED (1-120Hz)",
      "Camera": "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      "Updates": "7 Years of Android OS & Security updates"
    },
    reviews: [
      { id: 1, user: "Ananya Dixit", rating: 5, date: "3 days ago", comment: "Pure Android experience with unmatched computational photography." }
    ]
  },

  // Tablets
  {
    id: 301,
    name: "iPad Pro 13-inch M4 Ultra - Space Black",
    price: 119900,
    originalPrice: 129900,
    discountPercent: 7,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Impossibly thin design featuring groundbreaking Ultra Retina XDR Tandem OLED display and extreme M4 speed with Apple Pencil Pro support.",
    category: "Tablet",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 142,
    badge: "Best Seller",
    stockCount: 7,
    specs: {
      "Chip": "Apple M4 Chip with Hardware-Accelerated Ray Tracing",
      "Display": "13-inch Ultra Retina XDR Tandem OLED, 1600 nits peak",
      "Storage": "256GB / 512GB",
      "Thickness": "5.1 mm (Thinnest Apple product ever)",
      "Audio": "4-speaker sound system with studio quality mics"
    },
    reviews: [
      { id: 1, user: "Devansh Mehra", rating: 5, date: "1 week ago", comment: "The Tandem OLED screen is unbelievable. Insanely thin and light!" }
    ]
  },
  {
    id: 302,
    name: "Samsung Galaxy Tab S9 Ultra - 14.6\" Dynamic AMOLED",
    price: 98990,
    originalPrice: 115990,
    discountPercent: 14,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Massive 14.6-inch display with IP68 water resistance, included S Pen with ultra-low latency, and Snapdragon 8 Gen 2 powerhouse.",
    category: "Tablet",
    brand: "Samsung",
    rating: 4.8,
    reviewCount: 88,
    badge: "Trending",
    stockCount: 6,
    specs: {
      "Display": "14.6-inch Dynamic AMOLED 2X 120Hz",
      "Processor": "Qualcomm Snapdragon 8 Gen 2",
      "RAM": "12GB",
      "Storage": "512GB (Expandable up to 1TB via microSD)",
      "Battery": "11,200 mAh with 45W Fast Charging",
      "Protection": "IP68 Water & Dust Resistant"
    },
    reviews: [
      { id: 1, user: "Mohit Nair", rating: 5, date: "6 days ago", comment: "Like having a portable dual monitor. DeX mode is very productive." }
    ]
  },

  // Cameras
  {
    id: 401,
    name: "Sony Alpha ILCE-7RM5 (A7R V) Full-Frame Mirrorless",
    price: 325990,
    originalPrice: 359990,
    discountPercent: 9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "61.0 MP full-frame Exmor R BSI CMOS sensor paired with dedicated AI processing unit for next-level real-time subject tracking and 8K video.",
    category: "Camera",
    brand: "Sony",
    rating: 4.9,
    reviewCount: 76,
    badge: "Pro Choice",
    stockCount: 4,
    specs: {
      "Sensor": "61.0 MP Full-Frame Exmor R CMOS",
      "Autofocus": "693-point Phase-detection with AI Subject Recognition",
      "Video": "8K 24p / 4K 60p 10-Bit 4:2:2",
      "Stabilization": "8-step 5-axis In-body Image Stabilization (IBIS)",
      "Viewfinder": "9.44M-dot OLED EVF"
    },
    reviews: [
      { id: 1, user: "Ravi Teja", rating: 5, date: "2 weeks ago", comment: "Autofocus AI recognition is magical. The detail in 61MP files is breathtaking." }
    ]
  },
  {
    id: 402,
    name: "Canon EOS R6 Mark II Mirrorless Camera Kit",
    price: 215990,
    originalPrice: 245990,
    discountPercent: 12,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "High-speed continuous shooting up to 40 fps electronic shutter, 6K oversampled uncropped 4K 60p, and advanced Dual Pixel CMOS AF II.",
    category: "Camera",
    brand: "Canon",
    rating: 4.8,
    reviewCount: 64,
    badge: "Trending",
    stockCount: 5,
    specs: {
      "Sensor": "24.2 MP Full-Frame CMOS Sensor",
      "Shooting Speed": "Up to 40 fps electronic / 12 fps mechanical",
      "Video": "6K Oversampled 4K 60p, Canon Log 3",
      "Stabilization": "Up to 8 stops Coordinated Control IS",
      "ISO Range": "100-102400 (expandable to 204800)"
    },
    reviews: [
      { id: 1, user: "Kunal Ghosh", rating: 5, date: "1 month ago", comment: "Low light performance is unmatched. 40fps is crazy fast for wildlife and sports." }
    ]
  },

  // Audio & Headphones
  {
    id: 501,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 26990,
    originalPrice: 34990,
    discountPercent: 22,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, crystal clear hands-free calling, and 30-hour battery life.",
    category: "Audio",
    brand: "Sony",
    rating: 4.8,
    reviewCount: 540,
    badge: "Best Seller",
    stockCount: 20,
    specs: {
      "Noise Cancellation": "Dual Processors (V1 + QN1) with 8 Microphones",
      "Driver Unit": "30mm Precision Engineered Carbon Fiber",
      "Battery Life": "30 Hours (ANC ON) / 40 Hours (ANC OFF)",
      "Fast Charge": "3 min charge = 3 hours playback",
      "Weight": "250 grams"
    },
    reviews: [
      { id: 1, user: "Shreya Sen", rating: 5, date: "3 days ago", comment: "ANC completely blocks flight and train noise. Soundstage is rich and immersive!" }
    ]
  },
  {
    id: 502,
    name: "Apple AirPods Max - Space Gray",
    price: 54990,
    originalPrice: 59900,
    discountPercent: 8,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "High-fidelity audio with active noise cancellation, transparency mode, personalized spatial audio with dynamic head tracking, and knit-mesh canopy.",
    category: "Audio",
    brand: "Apple",
    rating: 4.7,
    reviewCount: 280,
    badge: "Premium Pick",
    stockCount: 10,
    specs: {
      "Audio Tech": "Apple H1 headphone chip (each ear cup)",
      "Transparency": "Adaptive Audio & Spatial Audio with dynamic head tracking",
      "Materials": "Anodized aluminum cups with breathable knit mesh headband",
      "Battery": "Up to 20 hours with ANC enabled",
      "Connector": "USB-C fast charging"
    },
    reviews: [
      { id: 1, user: "Harish Rao", rating: 5, date: "5 days ago", comment: "Build quality is in a league of its own. Transparency mode feels like you are not wearing headphones." }
    ]
  },

  // Smartwatches & Wearables
  {
    id: 601,
    name: "Apple Watch Ultra 2 - Titanium Ocean Band",
    price: 84900,
    originalPrice: 89900,
    discountPercent: 5,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Rugged and capable, crafted with corrosion-resistant titanium, brightest 3000 nits display, precision dual-frequency GPS, and up to 72 hrs battery in low power.",
    category: "Wearables",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 190,
    badge: "Hot Deal",
    stockCount: 8,
    specs: {
      "Case": "49mm Aerospace-grade Titanium",
      "Display": "Always-On Retina display, up to 3000 nits",
      "Water Resistance": "100m water resistant / 40m recreational dive ready",
      "Sensors": "ECG, Blood Oxygen, Depth gauge, Water temperature sensor",
      "Battery": "Up to 36 hours normal / 72 hours low power mode"
    },
    reviews: [
      { id: 1, user: "Tushar Kapoor", rating: 5, date: "4 days ago", comment: "Best smartwatch on the planet for marathon training and mountaineering." }
    ]
  },
  {
    id: 602,
    name: "Samsung Galaxy Watch 6 Classic - 47mm LTE",
    price: 33999,
    originalPrice: 40999,
    discountPercent: 17,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Timeless stainless steel design featuring iconic rotating bezel, comprehensive sleep coaching, Body Composition BIA analysis, and LTE connectivity.",
    category: "Wearables",
    brand: "Samsung",
    rating: 4.7,
    reviewCount: 135,
    badge: "Value Pick",
    stockCount: 12,
    specs: {
      "Case": "47mm Stainless Steel with Rotating Physical Bezel",
      "Display": "1.5-inch Super AMOLED Sapphire Crystal (480x480)",
      "Health Sensors": "BioActive Sensor (Optical Heart Rate + Electrical Heart Signal + BIA)",
      "Connectivity": "4G LTE Standalone eSIM, Bluetooth 5.3, Wi-Fi, NFC",
      "Durability": "IP68 + 5ATM + MIL-STD-810H"
    },
    reviews: [
      { id: 1, user: "Deepak Soni", rating: 5, date: "2 weeks ago", comment: "Physical rotating bezel is so satisfying to use! Looks like a genuine luxury watch." }
    ]
  }
];

// Available Promo Codes
export const PROMO_CODES = {
  SAVE10: { code: "SAVE10", discountPercent: 10, minAmount: 1000, description: "10% Instant Discount on orders above ₹1,000" },
  TECH20: { code: "TECH20", discountPercent: 20, minAmount: 50000, description: "20% Super Saver on orders above ₹50,000" },
  WELCOME500: { code: "WELCOME500", flatDiscount: 500, minAmount: 2000, description: "₹500 Flat Off on your shopping" }
};