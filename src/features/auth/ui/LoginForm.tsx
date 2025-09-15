import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, Space, message } from '@/shared/ui'
import { authApi } from '../api/auth-api'
import { useAuthStore } from '../model/auth-store'
import { ROUTES } from '@/shared/lib'

const { Title, Text } = Typography

export const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, setUser } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true)
      const { user } = await authApi.signIn(values.email, values.password)

      if (user) {
        const userData = await authApi.getCurrentUser()
        setUser(userData)
        message.success('Успешная авторизация')
      }
    } catch (error) {
      message.error('Ошибка авторизации. Проверьте логин и пароль.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      await authApi.signInWithGoogle()
    } catch (error) {
      message.error('Ошибка авторизации через Google')
      console.error('Google login error:', error)
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Корпоративный портал
            </Title>
            <Text type="secondary">Войдите в систему</Text>
          </div>

          <Form
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Некорректный email' },
              ]}
            >
              <Input placeholder="your@email.com" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: '100%' }}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">или</Text>
          </div>

          <Button
            icon={<span>🔍</span>}
            onClick={handleGoogleLogin}
            loading={loading}
            style={{ width: '100%' }}
          >
            Войти через Google
          </Button>
        </Space>
      </Card>
    </div>
  )
}