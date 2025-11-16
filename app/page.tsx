'use client'

import { useState, useEffect } from 'react'
import BiolinkPage from '@/components/biolink-page'
import AdminDashboard from '@/components/admin-dashboard'

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for admin mode via query param or localStorage
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
    const adminMode = params.get('admin') === 'true'
    setIsAdmin(adminMode)
    setIsLoading(false)
  }, [])

  if (isLoading) return null

  return isAdmin ? <AdminDashboard /> : <BiolinkPage />
}
