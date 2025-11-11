
import { GoogleGenAI, Type } from "@google/genai";
import { Candidate } from '../types';

// IMPORTANT: This file requires the environment variable `VITE_API_KEY` to be set.
// For Vite apps, environment variables must be prefixed with VITE_ to be exposed to the client.

const getAi = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        throw new Error("VITE_API_KEY environment variable not set. Please add it to your .env file or Vercel environment variables.");
    }
    return new GoogleGenAI({ apiKey });
}

export const screenCandidateCv = async (cvText: string, jobTitle: string, specialRequirements?: string): Promise<Candidate> => {
    const ai = getAi();
    const model = 'gemini-2.5-flash';

    const specialReqText = specialRequirements ? `\n\nSpecial Requirements:\n${specialRequirements}` : '';

    const prompt = `
        Please act as an expert HR professional and recruitment specialist.
        Analyze the following resume/CV text for the position of "${jobTitle}".
        Extract the candidate's information, evaluate their profile, and provide a detailed assessment.${specialReqText}
        Return the information in a structured JSON format according to the provided schema.
        
        CV Text:
        ---
        ${cvText}
        ---
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Candidate's full name" },
                    email: { type: Type.STRING, description: "Candidate's email address" },
                    phone: { type: Type.STRING, description: "Candidate's phone number" },
                    summary: { type: Type.STRING, description: "A brief professional summary of the candidate." },
                    experience: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                role: { type: Type.STRING },
                                company: { type: Type.STRING },
                                duration: { type: Type.STRING },
                            },
                        },
                    },
                    education: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                degree: { type: Type.STRING },
                                institution: { type: Type.STRING },
                            },
                        },
                    },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    aiScore: { type: Type.NUMBER, description: "An overall score from 0 to 100 based on fit for the job title." },
                    strengths: { type: Type.STRING, description: "A paragraph outlining the candidate's key strengths." },
                    weaknesses: { type: Type.STRING, description: "A paragraph outlining potential weaknesses or areas for improvement." },
                    recommendation: { type: Type.STRING, description: "A final hiring recommendation (e.g., 'Strongly Recommend for Interview', 'Consider for Interview', 'Not a good fit')." },
                },
            },
        },
    });

    const jsonString = response.text.trim();
    const candidateData = JSON.parse(jsonString) as Candidate;
    // Add the jobTitle to the candidate data
    candidateData.jobTitle = jobTitle;
    return candidateData;
};

export const generateJobDescription = async (jobTitle: string, requirements: string): Promise<string> => {
    const ai = getAi();
    const model = 'gemini-2.5-flash';
    const prompt = `
        Create a professional, detailed, and engaging job description for the following role.
        Use clear headings and bullet points. The tone should be professional yet inviting.

        Job Title: ${jobTitle}
        Key Requirements/Notes: ${requirements}
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    return response.text;
};

export const generateInterviewQuestions = async (jobTitle: string): Promise<string[]> => {
    const ai = getAi();
    const model = 'gemini-2.5-flash';

    const prompt = `
        Generate a list of 10-15 insightful interview questions for a candidate applying for the position of "${jobTitle}".
        Include a mix of behavioral, technical, and situational questions.
        Return the result as a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    questions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                }
            }
        }
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result.questions || [];
};
