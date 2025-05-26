'use client'
import { useState } from 'react'
import { generateContent } from '@/services/contentService'
import { useAuth } from '@/context/AuthContext'

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const { user } = useAuth()

  const handleGenerate = async () => {
    if (!user) return
    const content = await generateContent(prompt, user.uid)
    setOutput(content)
  }

  return (
    <div className="generator-card">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your content needs..."
      />
      <button onClick={handleGenerate}>Generate Content</button>
      {output && <div className="output">{output}</div>}
    </div>
  )
}