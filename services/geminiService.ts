
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

/**
 * Handles professional chat interactions about Sushil Kumar's portfolio.
 * Uses gemini-3-flash-preview as per guidelines for basic/general text tasks.
 */
export const chatWithMe = async (messages: ChatMessage[]) => {
  try {
    // Fix: Re-instantiate the client right before the call for up-to-date environment variables.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Fix: Ensure the first message in the content list is a 'user' role to prevent API error.
    const contents = messages
      .filter((m, i) => !(i === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are an AI representative for Sushil Kumar, a Senior Software Engineer at Oracle with 5+ years of experience. 
        His expertise includes Java, Spring Boot, Helidon, Kafka, and Kubernetes. 
        He is based in Hyderabad. He has certifications from TMForum, Oracle Cloud, and DeepLearning.AI.
        Be professional, concise, and helpful. 
        If asked about technical projects, mention OCUA and DX4C at Oracle. 
        If asked about location, mention he's in Hyderabad.`,
      },
    });

    return response.text || "I'm here to help! What else would you like to know about Sushil's experience?";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having a bit of a server hiccup. Can you try again?";
  }
};

/**
 * Provides location-based information grounded by Google Maps.
 * This is used for the "Local Guide" feature, specifically targeting Sushil's location (Hyderabad).
 * Maps grounding is exclusive to Gemini 2.5 series models.
 */
export const askLocalGuide = async (query: string, coords: { latitude: number; longitude: number } | null) => {
  try {
    // Fix: Re-instantiate to ensure we are using the most current environment context.
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await aiInstance.models.generateContent({
      model: "gemini-2.5-flash",
      // We prepend the context of Hyderabad to ensure local relevance if coordinates are generic.
      contents: `Regarding Hyderabad, India: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: coords ? {
          retrievalConfig: {
            latLng: {
              latitude: coords.latitude,
              longitude: coords.longitude
            }
          }
        } : undefined
      },
    });

    const text = response.text || "I couldn't find any specific information for that query in Hyderabad.";
    
    // Extract grounding chunks to provide clickable source links in the UI.
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const links = groundingChunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri,
      }));

    return { text, links };
  } catch (error) {
    console.error("Local Guide Error:", error);
    return { text: "I'm having trouble accessing local data right now. Please check back later.", links: [] };
  }
};
