import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const PROMPTS = {
  rewrite: 'Rewrite the following resume bullet points to be more impactful, using strong action verbs and quantifiable results where possible. Keep the same factual content, just improve the phrasing:',
  tone: 'Rewrite the following resume or portfolio text to sound more professional and polished, while keeping the same meaning and facts:',
  improve: 'Review the following resume or project description and suggest specific improvements. Point out weak phrasing, missing metrics, or unclear statements, and suggest better alternatives:',
}

export async function generateContent(mode, inputText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const promptInstruction = PROMPTS[mode] || PROMPTS.rewrite
  const fullPrompt = `${promptInstruction}\n\n${inputText}`

  const result = await model.generateContent(fullPrompt)
  const response = result.response
  return response.text()
}