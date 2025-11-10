import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMetrics = async (linodeLabel: string, metricsSummary: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a Senior Systems Reliability Engineer. 
      Analyze the following simulated performance metrics for a cloud server named "${linodeLabel}".
      
      Metrics Summary:
      ${metricsSummary}
      
      Provide a concise (max 3 bullet points) assessment of the server's health and 1 recommendation. 
      If the metrics look normal, confirm system stability.
      Do not use markdown headers.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Unable to analyze metrics at this time.";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "AI Analysis service is currently unavailable. Please check your API configuration.";
  }
};

export const generateInstanceLabel = async (region: string, image: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Generate a creative, cool, professional hostname for a cloud server located in ${region} running ${image}. Return ONLY the hostname string, nothing else. Example: 'nexus-prime-db'`;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text.trim();
    } catch (e) {
        return `node-${Math.floor(Math.random() * 10000)}`;
    }
}
