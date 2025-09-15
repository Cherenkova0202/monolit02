import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm, ProtectedRoute } from '@/features/auth'
import { MainLayout } from '@/layout/MainLayout'
import { ROUTES } from '@/shared/lib'

// Lazy load pages
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'))
const DocumentsPage = React.lazy(() => import('@/pages/documents/DocumentsPage'))
const ReferencesPage = React.lazy(() => import('@/pages/references/ReferencesPage'))
const AdminPage = React.lazy(() => import('@/pages/admin/AdminPage'))
const ReportsPage = React.lazy(() => import('@/pages/reports/ReportsPage'))

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />

        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD.slice(1)} element={<DashboardPage />} />
          <Route path={ROUTES.DOCUMENTS.slice(1)} element={<DocumentsPage />} />
          <Route path={ROUTES.REFERENCES.slice(1)} element={<ReferencesPage />} />
          <Route path={ROUTES.ADMIN.slice(1)} element={<AdminPage />} />
          <Route path={ROUTES.REPORTS.slice(1)} element={<ReportsPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  )
}