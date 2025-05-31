// components/UI.jsx
import React from "react"
import { Eye, EyeOff } from "lucide-react"

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full h-12 px-4 rounded border ${className}`}
      {...props}
    />
  )
}

export function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block font-medium">{children}</label>
}

export function Card({ children, className = "" }) {
  return <div className={`shadow-2xl border-0 bg-white rounded-xl p-6 ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="text-center pb-2">{children}</div>
}

export function CardTitle({ children }) {
  return <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
}

export function CardContent({ children }) {
  return <div className="space-y-6">{children}</div>
}

export function Alert({ children, type = "error" }) {
  const bg = type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
  return <div className={`p-3 rounded ${bg}`}>{children}</div>
}

export { Eye, EyeOff }
