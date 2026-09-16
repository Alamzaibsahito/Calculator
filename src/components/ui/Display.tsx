"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DisplayProps {
  expression: string
  result: string
  error?: boolean
}

const Display = ({ expression, result, error }: DisplayProps) => {
  return (
    <div className="flex flex-col items-end justify-end w-full px-6 py-8 min-h-[160px] glass rounded-3xl mb-6 relative overflow-hidden">
      <div className="text-gray-400 text-sm font-medium tracking-wider mb-2 h-6 overflow-hidden text-right w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={expression}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="block"
          >
            {expression || " "}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <div className="w-full text-right overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={result + (error ? 'error' : '')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: error ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
              type: "spring", 
              duration: 0.5,
              x: error ? { duration: 0.4 } : undefined
            }}
            className={`text-5xl font-bold tracking-tighter ${error ? 'text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'text-white'}`}
          >
            {result || "0"}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 blur-[50px] rounded-full -ml-10 -mb-10" />
    </div>
  )
}

export default Display
