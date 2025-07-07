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
  },
  {
    name: 'Optimization',
    contentpal: 'Continuous',
    competitors: ['One-time']
  },
  {
    name: 'Workflow',
    contentpal: 'Autonomous',
    competitors: ['Manual']
  },
  {
    name: 'Support',
    contentpal: '24/7 Dedicated',
    competitors: ['Community Only']
  }
]

export default function FeatureComparison() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Why ContentPal Dominates
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Head-to-head comparison with conventional AI tools
          </p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden">
          {/* Table Headers */}
          <div className="hidden md:grid grid-cols-3 gap-6 p-6 bg-gray-900 text-white">
            <div className="font-medium text-lg">Feature</div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold">ContentPal.AI</h3>
              <p className="text-blue-400 mt-1">Premium Solution</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-medium">Competitors</h3>
              <p className="text-gray-400 mt-1">Basic Tools</p>
            </div>
          </div>
          
          {/* Mobile Header */}
          <div className="md:hidden p-4 bg-gray-900 text-white text-center">
            <h3 className="text-xl font-bold">ContentPal vs Competitors</h3>
            <p className="text-gray-300 mt-1 text-sm">Feature Comparison</p>
          </div>

          <div className="p-4 md:p-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-4 md:py-5 border-b border-gray-100 last:border-0"
              >
                {/* Feature Name */}
                <div className="font-medium text-gray-900 text-sm md:text-base flex items-center">
                  <div className="bg-gray-200 p-1 rounded mr-2 md:mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  {feature.name}
                </div>
                
                {/* ContentPal Column */}
                <div className="md:text-center flex md:block items-center">
                  <div className="md:hidden text-gray-500 text-xs mr-2 w-20">ContentPal:</div>
                  <div className="text-blue-600 font-semibold text-sm md:text-base">
                    {feature.contentpal}
                  </div>
                </div>
                
                {/* Competitors Column */}
                <div className="md:text-center flex md:block items-center">
                  <div className="md:hidden text-gray-500 text-xs mr-2 w-20">Competitors:</div>
                  <div className="text-gray-500 text-sm md:text-base">
                    {feature.competitors.join(', ')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Mobile Callout */}
        <div className="mt-10 md:mt-16 text-center">
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            ContentPal outperforms competitors in all key aspects, delivering premium AI-powered content solutions
          </p>

        </div>
      </div>
    </section>
  )
}