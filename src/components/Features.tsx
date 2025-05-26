// components/FeaturesGrid.tsx
'use client'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

const features = [
  {
    title: "NeuralCore™ Technology",
    animationPath: '/lottie/aichip.json',
    description: "Proprietary AI architecture outperforming GPT-4 and Claude 3"
  },
  {
    title: "Autonomous Optimization",
    animationPath: '/lottie/automation.json',
    description: "Real-time performance tracking and content refinement"
  },
  {
    title: "Multi-Platform Mastery",
    animationPath: '/lottie/socials.json',
    description: "Seamless integration with Instagram, TikTok, LinkedIn, and X"
  }
]

export default function FeaturesGrid() {
  const [animations, setAnimations] = useState<any[]>([])

  useEffect(() => {
    const loadAnimations = async () => {
      const loaded = await Promise.all(
        features.map(async (feature) => {
          const response = await fetch(feature.animationPath)
          return {
            ...feature,
            animationData: await response.json()
          }
        })
      )
      setAnimations(loaded)
    }

    loadAnimations()
  }, [])

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            The ContentPal Advantage
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {animations.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="h-48 mb-6">
                {feature.animationData && (
                  <Lottie
                    animationData={feature.animationData}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}