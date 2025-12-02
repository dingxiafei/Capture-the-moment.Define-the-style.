import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorResponse, RicohRecipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to generate a sample image for a specific recipe
const generateRecipeImage = async (sceneDescription: string, recipe: RicohRecipe): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { 
            text: `A high-quality, photorealistic sample photograph capturing the scene: "${sceneDescription}". 
            Shot on a Ricoh GR III camera. 
            Aesthetic: ${recipe.vibe}, ${recipe.baseEffect} film simulation. 
            The image should look like a street photography masterpiece with the specific color grading and mood described.` 
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.warn(`Failed to generate image for recipe ${recipe.name}:`, error);
    return undefined;
  }
  return undefined;
};

export const generateRicohRecipes = async (sceneDescription: string): Promise<GeneratorResponse> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    You are a professional photographer and expert in Ricoh GR III and GR IIIx cameras.
    Based on the following scene description provided by the user, create 5 distinct "Ricoh Recipes" (JPEG presets) that would best capture the mood and aesthetic of the scene.

    Scene Description: "${sceneDescription}"

    Constraints:
    1. The recipes should offer a variety of interpretations (e.g., one high contrast B&W, one nostalgic negative film, one vivid positive film, one soft/dreamy, one cool/cinematic).
    2. Parameters like Saturation, Contrast, etc., must be integers typically between -4 and +4.
    3. White Balance should include specific temperature or type (e.g., "Daylight", "Cloudy", "K:4500") and color correction (e.g., "A:6 M:2").
    4. Provide shooting parameter suggestions (Aperture, SS, ISO) appropriate for the likely lighting of the scene.

    Return the response in strictly valid JSON format matching the schema.
  `;

  try {
    // 1. Generate the Text Recipes
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "A creative name for the recipe" },
                  baseEffect: { 
                    type: Type.STRING, 
                    description: "The base simulation mode (e.g., Positive Film, Hi-Contrast B&W)"
                  },
                  description: { type: Type.STRING, description: "Why this recipe fits the scene" },
                  vibe: { type: Type.STRING, description: "Short mood keywords (e.g., Melancholic, Cyberpunk)" },
                  settings: {
                    type: Type.OBJECT,
                    properties: {
                      saturation: { type: Type.INTEGER },
                      hue: { type: Type.INTEGER },
                      highLowKey: { type: Type.INTEGER },
                      contrast: { type: Type.INTEGER },
                      contrastHighlight: { type: Type.INTEGER },
                      contrastShadow: { type: Type.INTEGER },
                      sharpness: { type: Type.INTEGER },
                      shading: { type: Type.INTEGER },
                      clarity: { type: Type.INTEGER },
                      toning: { type: Type.STRING, description: "Optional toning for B&W (e.g., Sepia)" },
                      filterEffect: { type: Type.STRING, description: "Optional filter (e.g., Off, 1, 2, 3)" },
                      grain: { type: Type.INTEGER, description: "Grain effect level (1-3) or 0 for off" }
                    }
                  },
                  shootingParams: {
                    type: Type.OBJECT,
                    properties: {
                      aperture: { type: Type.STRING },
                      shutterSpeed: { type: Type.STRING },
                      iso: { type: Type.STRING },
                      whiteBalance: { type: Type.STRING },
                      wbCorrection: { type: Type.STRING, description: "White balance shift, e.g., B:2 M:4" },
                      exposureCompensation: { type: Type.STRING },
                      metering: { type: Type.STRING, description: "Metering mode e.g. Multi, Center, Highlight" }
                    }
                  }
                },
                required: ["name", "baseEffect", "description", "settings", "shootingParams", "vibe"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(text) as GeneratorResponse;

    // 2. Generate Images for each recipe in parallel
    const recipesWithImages = await Promise.all(
      data.recipes.map(async (recipe) => {
        const image = await generateRecipeImage(sceneDescription, recipe);
        return { ...recipe, sampleImage: image };
      })
    );

    return { recipes: recipesWithImages };

  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};