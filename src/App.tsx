import React, { useState, useEffect } from 'react'
import { Clock, UserPlus, UserMinus, Users } from 'lucide-react'
import VisitorForm from './components/VisitorForm'
import VisitorList from './components/VisitorList'
import VisitorTimeline from './components/VisitorTimeline'

interface Visitor {
  id: number
  name: string
  checkIn: Date
  checkOut: Date | null
}

function App() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [view, setView] = useState<'list' | 'timeline'>('list')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const addVisitor = (name: string) => {
    const newVisitor: Visitor = {
      id: Date.now(),
      name,
      checkIn: new Date(),
      checkOut: null,
    }
    setVisitors([...visitors, newVisitor])
  }

  const checkOutVisitor = (id: number) => {
    setVisitors(
      visitors.map((visitor) =>
        visitor.id === id ? { ...visitor, checkOut: new Date() } : visitor
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Visitor Time Recording</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock className="mr-2" />
              <span>{currentTime.toLocaleString()}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded-md ${
                  view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('timeline')}
                className={`px-3 py-1 rounded-md ${
                  view === 'timeline' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Timeline View
              </button>
            </div>
          </div>
        </header>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Check-In</h2>
          <VisitorForm onAddVisitor={addVisitor} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Visitor {view === 'list' ? 'List' : 'Timeline'}</h2>
          {view === 'list' ? (
            <VisitorList visitors={visitors} onCheckOut={checkOutVisitor} />
          ) : (
            <div className="space-y-4">
              {visitors.map((visitor) => (
                <VisitorTimeline key={visitor.id} visitor={visitor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App