import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Spin } from '@/shared/ui'
import { useAuthStore } from '../model/auth-store'
import { authApi } from '../api/auth-api'
import { ROUTES } from '@/shared/lib'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, setUser, setLoading } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.getCurrentUser()
        setUser(user)
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
      }
    }

    if (isLoading) {
      checkAuth()
    }
  }, [isLoading, setUser])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}