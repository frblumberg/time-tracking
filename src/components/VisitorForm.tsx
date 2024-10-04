import React, { useState } from 'react'
import { UserPlus } from 'lucide-react'

interface VisitorFormProps {
  onAddVisitor: (name: string) => void
}

const VisitorForm: React.FC<VisitorFormProps> = ({ onAddVisitor }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddVisitor(name.trim())
      setName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter visitor name"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <UserPlus className="inline-block mr-2" />
        Check-In
      </button>
    </form>
  )
}

export default VisitorForm