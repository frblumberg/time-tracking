import React from 'react'
import { Clock, LogIn, LogOut } from 'lucide-react'

interface Visitor {
  id: number
  name: string
  checkIn: Date
  checkOut: Date | null
}

interface VisitorTimelineProps {
  visitor: Visitor
}

const VisitorTimeline: React.FC<VisitorTimelineProps> = ({ visitor }) => {
  const duration = visitor.checkOut
    ? new Date(visitor.checkOut).getTime() - new Date(visitor.checkIn).getTime()
    : new Date().getTime() - new Date(visitor.checkIn).getTime()

  const hours = Math.floor(duration / (1000 * 60 * 60))
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{visitor.name}</h3>
      <div className="flex items-center mb-2">
        <LogIn className="text-green-500 mr-2" />
        <span className="text-sm">{new Date(visitor.checkIn).toLocaleString()}</span>
      </div>
      {visitor.checkOut && (
        <div className="flex items-center mb-2">
          <LogOut className="text-red-500 mr-2" />
          <span className="text-sm">{new Date(visitor.checkOut).toLocaleString()}</span>
        </div>
      )}
      <div className="relative h-2 bg-gray-200 rounded-full mt-4">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
          style={{
            width: visitor.checkOut ? '100%' : '50%',
            transition: 'width 0.5s ease-in-out',
          }}
        ></div>
      </div>
      <div className="flex items-center justify-end mt-2">
        <Clock className="text-gray-500 mr-2" />
        <span className="text-sm">
          {hours > 0 ? `${hours}h ` : ''}
          {minutes}m
        </span>
      </div>
    </div>
  )
}

export default VisitorTimeline