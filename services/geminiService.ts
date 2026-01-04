
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

/**
 * Handles professional chat interactions about Sushil Kumar's portfolio.
 * Uses gemini-3-flash-preview as per guidelines for basic/general text tasks.
 */
export const chatWithMe = async (messages: ChatMessage[]) => {
  try {
    // Re-instantiate the client right before the call for up-to-date environment variables.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Ensure the first message in the content list is a 'user' role to prevent API error.
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
 * Provides location-based info for Hyderabad using Google Maps grounding.
 * Maps grounding is supported in Gemini 2.5 series models.
 */
export const askLocalGuide = async (query: string, coords: { latitude: number; longitude: number } | null) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: coords ? {
          retrievalConfig: {
            latLng: {
              latitude: coords.latitude,
              longitude: coords.longitude
            }
          }
        } : undefined,
        systemInstruction: "You are a local guide for Hyderabad, India. Use Google Maps grounding to provide real-time recommendations for cafes, coworking spaces, and tech hubs. Always be helpful and professional.",
      },
    });

    const text = response.text || "I couldn't find specific recommendations for that.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract place URLs from groundingChunks as per guidelines.
    const links = chunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title || "View on Maps",
        uri: chunk.maps.uri
      }));

    return { text, links };
  } catch (error) {
    console.error("Local Guide Error:", error);
    return { text: "I'm having trouble accessing local maps data right now.", links: [] };
  }
};
