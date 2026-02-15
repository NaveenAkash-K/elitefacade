export const ASSETS = {
  productUnitized: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUW6f9WlST4JkcUySgn-cyX68vGH-5KQNgEtHUgGL99ojuRzgQLe-wyDQwL6r5C5Vi8rrfLXLHLvTySV2YbzK4zAjLjjlYONueX-HkJDAJfA0jgB9KIFHlrZA2JZcUjO5CweDAmBE4SH_ooybYIELlaBjggjSlstmcgEaKnf9Zf8vtt_Eo2dk41beSBqEUfi0dgg9Pvy87QOszqI2LbOHWb9eAaWdp6dBT0d_dw9hPRrHMpoLC8F1rBmsImJXYL9Dz4TW7DeytTIjL",

  productVantage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPQW03jBHS1ng9E68qIP4rYOpFR09IPGHP_F0M9lmFzjDkGOFTNMCyWgAe4GTKVZ3N6hcewMe7QcJKzi8N90xtHz05FrZDKA_O91iflSI5Hur-nxODTlV3WvBeaw9pYe24dD2AJeDX-Y_Y4_xXjWhuYs6bAJDekpSKAM7VHUiqBka59M-rBjZ04fhKGvHTUPGwx-sEVIKtFY4oEkbwTVCafqm_UrQIE1dmU3OKA6O97rniV0kJYVMAUIpAt7Yb2hryByzMbIttkvxY",

  productRailings: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvIIjDeKHWfsaqXSlLYupCBOgZ3W-vchcg2FDGL12lNtEiFa-4oR17hyxdZ70SWjEa53bIPoR4j9k8Ng4Umnj2Jv5C4tPGdDX2CdW7SueeGuP90qSzp8J8SvkXneWJAaz26EMEPfs-w-6VBzfcCuMZOVvzvpSGHbshBywDBRYq26i07nPK8d_7ecwxYnsMvbMEwAKh5hGqMg0eWxI9MrRuv-v7IAHxkp3sXD6EdLYNAKsrORYfayZmK9XhLyRolCOIWaQ8NOy7FS8F",

  productThermoElite: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoWX791RQc8Hbpi9KIQMtJv_fOirFP5c9P6MpF5VeMmQe77I_p30ZuVXgsExIM08Iw-DmZ0B0o95Abodl9l7p-A6_PqoSDxKs9ymQO3UEVpm2Fzxih2Cxia2JjG3r3tPZhkPZ89k4u99k3UlRM3Z7lgYsb0ZTLoB1cMlDiML3EitMY4UrM1N7smWHl_paWskPsbZKI_JNfIT2Zi1SQ8bloGS0qZz9jGc4Pw2yZmkBXxA1JSKIrZaguRQCxgBQx6X6jw2lkLX2ydPO4",

  productStick: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIHhjUNmibt4iQMPBW6xO7z_5fQtBpCNwQIoh0dkgAFso0TAw9VY0b85RsG0-6tSK5GTciQO5R1jvY_CknLsPB60Ba6983Zw5JWiffHsj2dqdQZgMHceOA1qfqcOK8tSFr0K-zA-U73pmJvTOmROy3zonX9W2yC09_HOsGgziTKMnL6xwsauHhga1u8VbU9a3j6n0PflkSnRvwBlnGpuW-DG0NUmsfSLMwbKYYKLcCbHgsTmRwDwikjaHtmvuiwcCR53yrvq5jYuYE",

  productLouvers: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqfUY_Yz6cfHcDiNwu65qZchGeAKZncCXw2cjXJ0zmFEk6ZQ_VjNfrHE_4lDfHK5YWKSOZLQ3qw88RJRIhIPGlKBncaNGKPKH2ZNTzpLV8nYx-t39BZKsUF8qJ39p4fa9wT-kVqvfsc740P_7_cy50r7tTAJ3cEDZLPuVZ4Gu0e-eXdV5T25MmEFQvJ41vJeESuteiGpylOSF7RBXkh27FzN59ei80HWLnPlESx2ZfGlmcmXgbK3pxAxaMABH70z3g1DnpDDT0hn9A",
};

export const FILTER_BUTTONS = [
  { label: "All Systems", hasDropdown: false },
  { label: "Curtain Walls", hasDropdown: true },
  { label: "Windows & Doors", hasDropdown: true },
  { label: "Glass Railings", hasDropdown: true },
  { label: "Louvers & Fins", hasDropdown: true },
];

export const PRODUCTS_DATA = [
  {
    imageKey: "productUnitized",
    title: "HG-800 Unitized Series",
    description: "Prefabricated panelized façade for rapid installation in high-density urban developments.",
    badge: "Best Seller",
    specs: [
      "U-Value: 0.85 W/m²K",
      "Wind Load: Up to 5.0 kPa",
      "Water Tightness: 1050 Pa",
    ],
  },
  {
    imageKey: "productVantage",
    title: "HG-Vantage Window",
    description: "Minimalist structural glazed windows with hidden drainage and thermal breaks.",
    badge: null,
    specs: [
      "Air Class: 4 (EN 12207)",
      "Sound Insulation: 44dB",
      "Frame Depth: 75mm",
    ],
  },
  {
    imageKey: "productRailings",
    title: "CrystalEdge Railings",
    description: "Fully transparent frameless glass balustrade with structural base channel technology.",
    badge: null,
    specs: [
      "Impact Grade: Class A",
      "Glass: 21.5mm Laminated",
      "Top Rail: Optional Slender",
    ],
  },
  {
    imageKey: "productThermoElite",
    title: "ThermoElite Series",
    description: "Passive-house certified window systems with triple glazing and aerospace-grade seals.",
    badge: null,
    specs: [
      "U-Value: 0.62 W/m²K",
      "Air Permeability: Class 4",
      "Thermal Break: 35mm",
    ],
  },
  {
    imageKey: "productStick",
    title: "HG-Stick Classic",
    description: "Field-assembled traditional curtain walling with maximum architectural flexibility.",
    badge: null,
    specs: [
      "Sightlines: 50mm",
      "Infill Range: 6mm - 50mm",
      "Finishing: PVDF/Anodized",
    ],
  },
  {
    imageKey: "productLouvers",
    title: "SolarFlow Louvers",
    description: "Integrated sun shading solutions designed to minimize heat gain while maximizing light.",
    badge: null,
    specs: [
      "Blade Type: Aerofoil",
      "Material: Grade 6063 T6",
      "Control: Fixed or Motorized",
    ],
  },
];

export const FOOTER_SOLUTIONS = [
  "Commercial Towers",
  "Residential Mid-rise",
  "Institutional Buildings",
  "Renovation & Retrofit",
];

export const FOOTER_COMPANY = [
  "About Engineering",
  "Project Showcase",
  "Sustainability",
  "Careers",
];

export const FOOTER_OFFICES = [
  "London HQ: 42 Canary Wharf, London, UK",
  "Dubai Office: Burj Daman, DIFC",
];