"use client"
import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'default' | 'operator' | 'action' | 'equals'
}

const Button = ({ variant = 'default', className, children, ...props }: ButtonProps) => {

  const variants = {
    default: "bg-white/5 hover:bg-white/10 text-white neumorphic-button",
    operator: "operator-gradient text-white shadow-lg",
    action: "bg-white/10 hover:bg-white/20 text-gray-300 text-sm",
    equals: "accent-gradient text-white shadow-xl font-bold"
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(255,255,255,0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative flex items-center justify-center rounded-2xl p-4 text-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white/20",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
