"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History as HistoryIcon, Trash2, X } from 'lucide-react'

interface HistoryItem {
  expression: string
  result: string
  timestamp: Date
}

interface HistoryProps {
  history: HistoryItem[]
  isOpen: boolean
  onClose: () => void
  onClear: () => void
  onSelect: (item: HistoryItem) => void
}

const History = ({ history, isOpen, onClose, onClear, onSelect }: HistoryProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 h-full w-full sm:w-80 glass z-50 rounded-l-3xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-white font-semibold">
              <HistoryIcon size={20} className="text-orange-400" />
              History
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {history.length === 0 ? (
              <div className="text-gray-500 text-center mt-20 italic">No history yet</div>
            ) : (
              history.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={index}
                  onClick={() => onSelect(item)}
                  className="group cursor-pointer p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                >
                  <div className="text-gray-400 text-sm mb-1 truncate">{item.expression}</div>
                  <div className="text-white text-xl font-bold truncate">= {item.result}</div>
                </motion.div>
              ))
            )}
          </div>

          {history.length > 0 && (
            <button
              onClick={onClear}
              className="mt-6 flex items-center justify-center gap-2 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-2xl transition-all font-medium"
            >
              <Trash2 size={18} />
              Clear History
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default History
