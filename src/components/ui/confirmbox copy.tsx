'use client'

import React from 'react'

interface ConfirmBoxProps {
  question: string
  confirmColor: string
  cancelColor: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  question,
  confirmColor,
  cancelColor,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <p className="text-center text-lg font-medium mb-4">{question}</p>
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-md text-white ${confirmColor}`}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${cancelColor}`}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox