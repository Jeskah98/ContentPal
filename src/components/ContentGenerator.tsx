'use client'
import { useState } from 'react'
import { generateContent } from '@/services/contentService'
import { useAuth } from '@/context/AuthContext'

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleGenerate = async () => {
    if (!user) return
    setLoading(true)
    const result = await generateContent(prompt, user.uid)
    setOutput(result.content) // Assuming result has a 'content' property
  }

  return (
    <div className="generator-card">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your content needs..."
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
      {output && <div className="output">{output}</div>} {/* Display output only if it exists */}
    </div>
  )
}