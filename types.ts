export enum BaseEffect {
  Standard = "Standard",
  Vivid = "Vivid",
  Monotone = "Monotone",
  SoftMonotone = "Soft Monotone",
  HardMonotone = "Hard Monotone",
  HiContrastBW = "Hi-Contrast B&W",
  NegativeFilm = "Negative Film",
  PositiveFilm = "Positive Film",
  BleachBypass = "Bleach Bypass",
  Retro = "Retro",
  HDRTone = "HDR Tone",
  CrossProcess = "Cross Process"
}

export interface ImageSettings {
  saturation?: number;
  hue?: number;
  highLowKey?: number;
  contrast?: number;
  contrastHighlight?: number;
  contrastShadow?: number;
  sharpness?: number;
  shading?: number;
  clarity?: number;
  toning?: string; // For B&W effects
  filterEffect?: string; // For B&W effects
  grain?: number; // Some newer firmwares support grain
}

export interface ShootingParams {
  aperture: string;
  shutterSpeed: string;
  iso: string;
  whiteBalance: string;
  wbCorrection: string; // e.g., A:4 G:2
  exposureCompensation: string;
  metering?: string; // Added metering mode
}

export interface RicohRecipe {
  id?: string;
  name: string;
  category?: string; // Added category for grouping (e.g., Street, Portrait)
  baseEffect: BaseEffect;
  description: string;
  settings: ImageSettings;
  shootingParams: ShootingParams;
  vibe: string;
  sampleImage?: string;
  collageImages?: string[];
  previewGradient?: string;
}

export interface GeneratorResponse {
  recipes: RicohRecipe[];
}