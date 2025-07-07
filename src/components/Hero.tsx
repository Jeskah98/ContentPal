// components/Hero.tsx (Enhanced)
'use client'
import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import Link from 'next/link';

export default function HeroSection() {

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-6">
              Autonomous Content Artistry
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Luxury-grade AI content generation for brands that demand perfection
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/subscribe"               className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
                Start Free Trial
            </Link>
            {/*//<button className="flex items-center justify-center text-white hover:text-blue-300 gap-2 group">
              //<PlayCircle className="w-8 h-8 transition-transform group-hover:scale-110" />
              //<span className="text-lg">Watch Demo</span>
            //</button>*/}
          </motion.div>

          {/*<div className="mt-20 relative h-96 rounded-3xl overflow-hidden border border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-900">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute inset-0 overflow-hidden"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/charle.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Gradient overlay 
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/20 to-transparent" />
            </motion.div>
          </div>*/}
        </div>
      </div>
    </section>
  )
}