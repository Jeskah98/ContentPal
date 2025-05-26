// components/FeatureComparison.tsx
'use client'
import { motion } from 'framer-motion'

const features = [
  {
    name: 'AI Model',
    contentpal: 'NeuralCore™',
    competitors: ['GPT-4', 'Claude 3']
  },
  {
    name: 'Brand Adaptation',
    contentpal: 'Real-time',
    competitors: ['Manual Training']
  },
  {
    name: 'Content Types',
    contentpal: 'Unlimited',
    competitors: ['5 Templates']
  }
]

export default function FeatureComparison() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why ContentPal Dominates
          </h2>
          <p className="text-gray-600">
            Head-to-head comparison with conventional AI tools
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-8 p-8 bg-gray-900 text-white">
            <div></div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">ContentPal.AI</h3>
              <p className="text-blue-400">Premium Solution</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl">Competitors</h3>
              <p className="text-gray-400">Basic Tools</p>
            </div>
          </div>

          <div className="p-8">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="grid grid-cols-3 gap-8 py-6 border-b border-gray-100"
              >
                <div className="font-medium">{feature.name}</div>
                <div className="text-blue-600 font-semibold">
                  {feature.contentpal}
                </div>
                <div className="text-gray-500">
                  {feature.competitors.join(', ')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}