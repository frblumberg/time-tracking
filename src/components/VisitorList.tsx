import React from 'react'
import { UserMinus } from 'lucide-react'

interface Visitor {
  id: number
  name: string
  checkIn: Date
  checkOut: Date | null
}

interface VisitorListProps {
  visitors: Visitor[]
  onCheckOut: (id: number) => void
}

const VisitorList: React.FC<VisitorListProps> = ({ visitors, onCheckOut }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Check-In</th>
            <th className="px-4 py-2 text-left">Check-Out</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id} className="border-b">
              <td className="px-4 py-2">{visitor.name}</td>
              <td className="px-4 py-2">{visitor.checkIn.toLocaleString()}</td>
              <td className="px-4 py-2">
                {visitor.checkOut ? visitor.checkOut.toLocaleString() : '-'}
              </td>
              <td className="px-4 py-2">
                {!visitor.checkOut && (
                  <button
                    onClick={() => onCheckOut(visitor.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <UserMinus className="inline-block mr-1" />
                    Check-Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VisitorList