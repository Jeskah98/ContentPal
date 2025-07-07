'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { CheckCircle, Zap, Rocket, Award, Clock, Users } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-soft-light opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-700 rounded-full mix-blend-soft-light opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-700 rounded-full mix-blend-soft-light opacity-50 animate-pulse"></div>
      </div>
      
      {/* Glowing particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container @container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Limited Time Offer Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full mb-8 animate-pulse mx-auto"
          >
            <Clock size={18} />
            <span className="font-bold uppercase tracking-wider">Limited Time Launch Offer</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl @lg:text-6xl font-extrabold mb-6 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-center">Your AI-Powered Social Media</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Revolution Starts Now!
            </span>
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-xl @lg:text-2xl max-w-3xl mx-auto opacity-95 font-medium text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join 1,200+ elite brands transforming their social presence with ContentPal AI
          </motion.p>
          
          {/* Value Proposition Grid - Centered */}
          <motion.div 
            className="grid grid-cols-2 gap-4 @sm:gap-6 mt-10 mb-12 max-w-4xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: Zap, text: "AI-Powered Content Creation" },
              { icon: Rocket, text: "10x Engagement Growth" },
              { icon: Award, text: "Premium Brand Positioning" },
              { icon: Users, text: "24/7 Audience Engagement" },
              { icon: CheckCircle, text: "7-Day Free Trial" },
              { icon: Clock, text: "Time-Saving Automation" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center bg-white/10 p-4 @sm:p-5 rounded-lg backdrop-blur-sm text-center"
              >
                <item.icon className={`w-8 h-8 mb-3 ${
                  index % 3 === 0 ? 'text-blue-400' : 
                  index % 3 === 1 ? 'text-purple-400' : 'text-green-400'
                }`} />
                <span className="text-sm @sm:text-base font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Urgent Call-to-Action */}
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/signup"
              className={buttonVariants({
                size: 'default',
                variant: 'default',
                className: "group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:from-blue-600 hover:to-purple-600 text-lg py-6 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              })}
            >
              <span className="relative z-10">Start Your Free Trial Now</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <motion.span 
                className="absolute top-0 left-0 w-full h-0.5 bg-white"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}