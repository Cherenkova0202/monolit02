import React, { useState, Suspense } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Typography,
  Spin,
  Button,
  Space,
} from '@/shared/ui'
import { useAuthStore, authApi } from '@/features/auth'
import { ROUTES } from '@/shared/lib'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()

  const handleLogout = async () => {
    try {
      await authApi.signOut()
      signOut()
      navigate(ROUTES.LOGIN)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Профиль',
      icon: <span>👤</span>,
    },
    {
      key: 'settings',
      label: 'Настройки',
      icon: <span>⚙️</span>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Выход',
      icon: <span>🚪</span>,
      onClick: handleLogout,
    },
  ]

  const sidebarMenuItems: MenuProps['items'] = [
    {
      key: ROUTES.DASHBOARD,
      icon: <span>📊</span>,
      label: 'Дашборд',
      onClick: () => navigate(ROUTES.DASHBOARD),
    },
    {
      key: ROUTES.DOCUMENTS,
      icon: <span>📄</span>,
      label: 'Документы',
      onClick: () => navigate(ROUTES.DOCUMENTS),
    },
    {
      key: ROUTES.REFERENCES,
      icon: <span>📚</span>,
      label: 'Справочники',
      onClick: () => navigate(ROUTES.REFERENCES),
    },
    {
      key: ROUTES.REPORTS,
      icon: <span>📈</span>,
      label: 'Отчеты',
      onClick: () => navigate(ROUTES.REPORTS),
    },
    {
      key: ROUTES.ADMIN,
      icon: <span>⚙️</span>,
      label: 'Администрирование',
      onClick: () => navigate(ROUTES.ADMIN),
    },
  ]

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      [ROUTES.DASHBOARD]: 'Дашборд',
      [ROUTES.DOCUMENTS]: 'Документы',
      [ROUTES.REFERENCES]: 'Справочники',
      [ROUTES.REPORTS]: 'Отчеты',
      [ROUTES.ADMIN]: 'Администрирование',
    }
    return titles[location.pathname] || 'Корпоративный портал'
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        style={{
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 16px',
        }}>
          {!collapsed ? (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              Портал
            </Title>
          ) : (
            <span style={{ fontSize: '24px' }}>🏢</span>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={sidebarMenuItems}
          style={{ border: 'none' }}
        />
      </Sider>

      <Layout>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Title level={3} style={{ margin: 0 }}>
            {getPageTitle()}
          </Title>

          <Space>
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              icon={<span>{collapsed ? '👁️' : '👁️‍🗨️'}</span>}
            />

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  size="small"
                  src={user?.avatar_url}
                  style={{ backgroundColor: '#1890ff' }}
                >
                  {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                </Avatar>
                <span style={{ fontSize: '14px' }}>
                  {user?.full_name || user?.email}
                </span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{
          margin: '24px',
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 112px)',
          overflow: 'auto',
        }}>
          <Suspense fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}>
              <Spin size="large" />
            </div>
          }>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}