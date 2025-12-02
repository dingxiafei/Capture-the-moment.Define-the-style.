import { RicohRecipe, BaseEffect } from "../types";

export const defaultRecipes: RicohRecipe[] = [
  // --- DAILY SNAPSHOTS (New Category from User Images) ---
  {
    id: "user-01-negative-daily",
    name: "Negative Daily",
    category: "Daily Snapshots",
    baseEffect: BaseEffect.NegativeFilm,
    description: "A reliable everyday preset. Versatile enough for any situation, providing a balanced yet distinct film look.",
    vibe: "Casual & Reliable",
    collageImages: [
      "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621193677209-66127a3d9068?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518599803932-5555d4911d33?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-red-400 to-orange-300",
    settings: {
      saturation: 0,
      hue: 1,
      highLowKey: 1,
      contrast: 3,
      contrastHighlight: -3,
      contrastShadow: 3,
      sharpness: 3,
      shading: -1,
      clarity: 0
    },
    shootingParams: {
      aperture: "F2.8 - F5.6",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G3, A10",
      exposureCompensation: "0",
      metering: "Multi"
    }
  },
  {
    id: "user-04-positive-daily",
    name: "Positive Daily",
    category: "Daily Snapshots",
    baseEffect: BaseEffect.PositiveFilm,
    description: "Soft and gentle. Uses Positive Film for a punchy look but softened with parameter adjustments. Great for laundry days and soft light.",
    vibe: "Soft & Gentle",
    collageImages: [
      "https://images.unsplash.com/photo-1562664347-1941d624a04d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504541891213-1b1bbb789c76?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-blue-300 to-white",
    settings: {
      saturation: 1,
      hue: 2,
      highLowKey: 2,
      contrast: -1,
      contrastHighlight: -2,
      contrastShadow: 2,
      sharpness: 0,
      shading: 0,
      clarity: 0
    },
    shootingParams: {
      aperture: "F2.8",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Daylight",
      wbCorrection: "G4, A8",
      exposureCompensation: "+0.3",
      metering: "Multi"
    }
  },

  // --- NATURE & SCENERY (New Category) ---
  {
    id: "user-02-fresh-green",
    name: "Fresh Green",
    category: "Nature & Scenery",
    baseEffect: BaseEffect.NegativeFilm,
    description: "Optimized for vegetation. Makes greens pop with a fresh, clear, and clean aesthetic. Perfect for parks and forests.",
    vibe: "Clean & Fresh",
    collageImages: [
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    settings: {
      saturation: 1,
      hue: 3,
      highLowKey: 3,
      contrast: 3,
      contrastHighlight: -3,
      contrastShadow: 2,
      sharpness: 1,
      shading: -1,
      clarity: -2
    },
    shootingParams: {
      aperture: "F4",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G1, A4",
      exposureCompensation: "+0.3",
      metering: "Multi"
    }
  },
  {
    id: "user-05-refreshing-film",
    name: "Refreshing Film",
    category: "Nature & Scenery",
    baseEffect: BaseEffect.PositiveFilm,
    description: "Bright, high-key look. Excellent for sunny days outdoors, even when slightly overexposed. Gives a Japanese summer vibe.",
    vibe: "Bright & Airy",
    collageImages: [
      "https://images.unsplash.com/photo-1533552084420-428615c0e0b3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-sky-300 to-white",
    settings: {
      saturation: 1,
      hue: 2,
      highLowKey: 1,
      contrast: 1,
      contrastHighlight: 0,
      contrastShadow: 0,
      sharpness: 0,
      shading: 1,
      clarity: 0
    },
    shootingParams: {
      aperture: "F5.6",
      shutterSpeed: "1/500",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G8, A2",
      exposureCompensation: "+0.7",
      metering: "Multi"
    }
  },
  {
    id: "user-06-cool-blue",
    name: "Cool Blue",
    category: "Nature & Scenery",
    baseEffect: BaseEffect.PositiveFilm,
    description: "Cold, ethereal tones. Ideal for capturing blue-green subjects, water, or creating a melancholic atmosphere.",
    vibe: "Cold & Ethereal",
    collageImages: [
      "https://images.unsplash.com/photo-1520690214124-2405c5217036?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464639351491-a172c2aa2911?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506057278219-795833d20631?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-cyan-200 to-blue-400",
    settings: {
      saturation: 1,
      hue: 3,
      highLowKey: 1,
      contrast: -1,
      contrastHighlight: 0,
      contrastShadow: 1,
      sharpness: 0,
      shading: 2,
      clarity: 0
    },
    shootingParams: {
      aperture: "F2.8",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G1, B2",
      exposureCompensation: "0",
      metering: "Multi"
    }
  },

  // --- ATMOSPHERE & MOOD (New Category) ---
  {
    id: "user-03-warm-film",
    name: "Warm Film",
    category: "Cinematic Mood",
    baseEffect: BaseEffect.NegativeFilm,
    description: "Rich, warm tones driven by the 'Cloudy' white balance. Perfect for golden hour, reeds in the wind, and nostalgic memories.",
    vibe: "Warm & Nostalgic",
    collageImages: [
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-amber-200 to-orange-400",
    settings: {
      saturation: 2,
      hue: 1,
      highLowKey: 2,
      contrast: -1,
      contrastHighlight: 1,
      contrastShadow: 2,
      sharpness: 0,
      shading: 1,
      clarity: -1
    },
    shootingParams: {
      aperture: "F2.8",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Cloudy",
      wbCorrection: "G7, A9",
      exposureCompensation: "0",
      metering: "Center"
    }
  },

  // --- STREET PHOTOGRAPHY (Existing) ---
  {
    id: "universal-01",
    name: "Tokyo Vivid",
    category: "Street Photography",
    baseEffect: BaseEffect.NegativeFilm,
    description: "A vivid and high-contrast look suitable for colorful street scenes and chaotic urban environments. Emphasizes color separation.",
    vibe: "Neon & Chaos",
    collageImages: [
      "https://images.unsplash.com/photo-1541447271487-09612b8f49ac?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    settings: {
      saturation: 1,
      hue: 1,
      highLowKey: -1,
      contrast: 4,
      contrastHighlight: 0,
      contrastShadow: 0,
      sharpness: 1,
      shading: 0,
      clarity: 0
    },
    shootingParams: {
      aperture: "F2.8 - F4",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G2, A10",
      exposureCompensation: "0",
      metering: "Multi"
    }
  },
  {
    id: "universal-04-fashion",
    name: "Fashion Street",
    category: "Street Photography",
    baseEffect: BaseEffect.PositiveFilm,
    description: "Clean and sharp, perfect for fashion snapshots and modern street photography. High contrast but balanced skin tones.",
    vibe: "Clean & Sharp",
    collageImages: [
       "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-blue-800 to-gray-800",
    settings: {
      saturation: 0,
      hue: 1,
      highLowKey: 1,
      contrast: 3,
      contrastHighlight: -3,
      contrastShadow: 3,
      sharpness: 3,
      shading: 0,
      clarity: 0
    },
    shootingParams: {
      aperture: "F5.6",
      shutterSpeed: "1/250",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G2, A10",
      exposureCompensation: "0",
      metering: "Multi"
    }
  },
  {
    id: "street-bw",
    name: "High Contrast Snap",
    category: "Street Photography",
    baseEffect: BaseEffect.HiContrastBW,
    description: "The classic GR look. Deep blacks, bright whites, and gritty grain for that Daido Moriyama feel.",
    vibe: "Gritty B&W",
    collageImages: [
      "https://images.unsplash.com/photo-1504194921103-98a70f443588?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542460631-1e98341bb25c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571221546944-93b593f06c1c?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-black via-gray-800 to-white",
    settings: {
        saturation: 0,
        hue: 0,
        highLowKey: -2,
        contrast: 4,
        contrastHighlight: 4,
        contrastShadow: -4,
        sharpness: 2,
        shading: 1,
        clarity: 3,
        grain: 3
    },
    shootingParams: {
        aperture: "F8",
        shutterSpeed: "1/500",
        iso: "Auto Hi",
        whiteBalance: "Daylight",
        wbCorrection: "0, 0",
        exposureCompensation: "-0.7",
        metering: "Highlight Weighted"
    }
  },

  // --- LIFESTYLE & CAFE (Existing) ---
  {
    id: "universal-02",
    name: "Texture Shop",
    category: "Lifestyle & Cafe",
    baseEffect: BaseEffect.NegativeFilm,
    description: "Designed for capturing textures in shops, food, and still life. Balances high saturation with a slightly darker mood for depth.",
    vibe: "Texture & Depth",
    collageImages: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-amber-700 to-stone-900",
    settings: {
      saturation: 3,
      hue: 1,
      highLowKey: 2,
      contrast: 2,
      contrastHighlight: -1,
      contrastShadow: -1,
      sharpness: 3,
      shading: 0,
      clarity: 0
    },
    shootingParams: {
      aperture: "F2.8",
      shutterSpeed: "1/60",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G1, A2",
      exposureCompensation: "0",
      metering: "Center Weighted"
    }
  },
  {
    id: "universal-05",
    name: "Elegant Chocolate",
    category: "Lifestyle & Cafe",
    baseEffect: BaseEffect.NegativeFilm,
    description: "Warm, vintage tones reminiscent of classic film. Soft sharpness and clarity for a dreamy, nostalgic feel.",
    vibe: "Vintage & Warm",
    collageImages: [
       "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1550926713-39d67576a47a?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-orange-900 via-amber-900 to-black",
    settings: {
      saturation: 2,
      hue: -1,
      highLowKey: 2,
      contrast: 3,
      contrastHighlight: -4,
      contrastShadow: 4,
      sharpness: -2,
      shading: 0,
      clarity: -1
    },
    shootingParams: {
      aperture: "F2.8",
      shutterSpeed: "Auto",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G4, A14",
      exposureCompensation: "+0.3",
      metering: "Multi"
    }
  },

  // --- CINEMATIC MOOD (Existing) ---
  {
    id: "universal-03",
    name: "Cinematic Teal",
    category: "Cinematic Mood",
    baseEffect: BaseEffect.PositiveFilm,
    description: "A cinematic look using Positive Film. Offers a moody, storytelling aesthetic with adjusted highlights and shadows.",
    vibe: "Moody & Teal",
    collageImages: [
       "https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=800&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-teal-900 via-cyan-900 to-orange-900",
    settings: {
      saturation: 1,
      hue: 2,
      highLowKey: -2,
      contrast: 2,
      contrastHighlight: 1,
      contrastShadow: -2,
      sharpness: 1,
      shading: 2,
      clarity: 1
    },
    shootingParams: {
      aperture: "F2.8",
      shutterSpeed: "1/50",
      iso: "Auto",
      whiteBalance: "Multi Auto",
      wbCorrection: "G8, A4",
      exposureCompensation: "-0.3",
      metering: "Highlight Weighted"
    }
  },
  {
    id: "bleach-city",
    name: "Bleach Bypass",
    category: "Cinematic Mood",
    baseEffect: BaseEffect.BleachBypass,
    description: "Desaturated and metallic. Great for industrial scenes and architecture.",
    vibe: "Cold & Metallic",
    collageImages: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506764625528-795435900593?q=80&w=800&auto=format&fit=crop"
    ],
    previewGradient: "bg-gradient-to-br from-slate-400 via-gray-600 to-slate-800",
    settings: {
        saturation: -1,
        hue: 0,
        highLowKey: -1,
        contrast: 3,
        contrastHighlight: 2,
        contrastShadow: 2,
        sharpness: 2,
        shading: 2,
        clarity: 2
    },
    shootingParams: {
        aperture: "F5.6",
        shutterSpeed: "1/200",
        iso: "Auto",
        whiteBalance: "Cloudy",
        wbCorrection: "B4, G2",
        exposureCompensation: "-0.7",
        metering: "Multi"
    }
  }
];
