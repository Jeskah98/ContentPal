import axios from 'axios'

export const generateContent = async (
  prompt: string,
  userId: string
) => {
  const response = await axios.post('/api/generate-content', {
    prompt,
    userId
  })
  return response.data
}

export const saveContent = async (content: string, userId: string) => {
  await axios.post('/api/save-content', { content, userId })
}