"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Delete, Equal, Divide, X, Minus, Plus, History as HistoryIcon } from 'lucide-react'
import Button from '../ui/Button'
import Display from '../ui/Display'
import History from './History'


interface HistoryItem {
  expression: string
  result: string
  timestamp: Date
}

const Calculator = () => {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const formatNumber = (num: string) => {
    if (!num || isNaN(Number(num))) return num
    const parts = num.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join('.')
  }

  const calculate = useCallback(() => {
    if (!expression) return

    try {
      // Basic sanitization and safety
      // Replace symbols with JS operators
      const sanitizedExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100')
      
      const evalResult = eval(sanitizedExpression)
      
      if (!isFinite(evalResult)) {
        throw new Error("Divide by zero")
      }

      const formattedResult = Number(evalResult.toFixed(8)).toString()
      setResult(formattedResult)
      setError(false)
      
      // Add to history
      const newItem = {
        expression: expression,
        result: formattedResult,
        timestamp: new Date()
      }
      setHistory(prev => [newItem, ...prev].slice(0, 50))
    } catch {
      setError(true)
      setResult("Error")
    }

  }, [expression])

  const handleButtonClick = useCallback((value: string) => {
    setError(false)
    
    if (value === "=") {
      calculate()
    } else if (value === "C") {
      setExpression("")
      setResult("")
    } else if (value === "CE") {
      setResult("")
    } else if (value === "⌫") {
      setExpression(prev => prev.slice(0, -1))
    } else if (value === "±") {
      if (expression.startsWith("-")) {
        setExpression(expression.slice(1))
      } else {
        setExpression("-" + expression)
      }
    } else {
      // Prevent consecutive operators
      const lastChar = expression.slice(-1)
      const operators = ["+", "-", "×", "÷", "."]
      if (operators.includes(value) && operators.includes(lastChar)) {
        setExpression(prev => prev.slice(0, -1) + value)
      } else {
        setExpression(prev => prev + value)
      }
    }
  }, [expression, calculate])

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      if (/[0-9]/.test(key)) handleButtonClick(key)
      if (key === "+") handleButtonClick("+")
      if (key === "-") handleButtonClick("-")
      if (key === "*") handleButtonClick("×")
      if (key === "/") handleButtonClick("÷")
      if (key === ".") handleButtonClick(".")
      if (key === "%") handleButtonClick("%")
      if (key === "Enter" || key === "=") {
        e.preventDefault()
        handleButtonClick("=")
      }
      if (key === "Backspace") handleButtonClick("⌫")
      if (key === "Escape") handleButtonClick("C")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleButtonClick])

  const buttons = [
    { label: "C", value: "C", variant: "action" as const },
    { label: "CE", value: "CE", variant: "action" as const },
    { label: <Delete size={20} />, value: "⌫", variant: "action" as const },
    { label: <Divide size={20} />, value: "÷", variant: "operator" as const },
    
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: <X size={20} />, value: "×", variant: "operator" as const },
    
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: <Minus size={20} />, value: "-", variant: "operator" as const },
    
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: <Plus size={20} />, value: "+", variant: "operator" as const },
    
    { label: "±", value: "±" },
    { label: "0", value: "0" },
    { label: ".", value: "." },
    { label: <Equal size={24} />, value: "=", variant: "equals" as const },
  ]

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white"
          >
            <HistoryIcon size={20} />
          </button>
        </div>

        <Display 
          expression={expression} 
          result={formatNumber(result)} 
          error={error} 
        />

        <div className="grid grid-cols-4 gap-4">
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              variant={btn.variant}
              onClick={() => handleButtonClick(btn.value as string)}
              className={btn.value === "=" ? "col-span-1" : ""}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Floating background elements for depth */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
      </motion.div>

      <History 
        history={history}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onClear={() => setHistory([])}
        onSelect={(item) => {
          setExpression(item.expression)
          setResult(item.result)
          setIsHistoryOpen(false)
        }}
      />
    </div>
  )
}

export default Calculator
