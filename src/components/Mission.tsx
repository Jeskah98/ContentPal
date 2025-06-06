// components/Mission.tsx (New)
export default function MissionStatement() {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Redefining AI-Powered Content Creation
            </h2>
            <div className="grid md:grid-cols-3 gap-12 text-gray-300">
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">400%</h3>
                <p>Average Engagement Increase</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">24/7</h3>
                <p>Autonomous Content Optimization</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-green-400 mb-4">0.5h</h3>
                <p>Weekly Time Investment Needed</p>
              </div>
            </div>
            
            <p className="mt-16 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At ContentPal.AI, we're pioneering a new era of brand storytelling. Our NeuralCore™ 
              technology combines cutting-edge AI with human-inspired creativity to deliver content 
              that resonates, engages, and converts.
            </p>
          </div>
        </div>
      </section>
    )
  }