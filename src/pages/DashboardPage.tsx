import React from 'react'
import { Card, Typography, Space, Row, Col } from '@/shared/ui'

const { Title, Text } = Typography

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>Добро пожаловать в корпоративный портал</Title>
          <Text type="secondary">
            Здесь вы можете управлять документами, настройками и отчетностью
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card
              title="📄 Документы"
              hoverable
              style={{ textAlign: 'center' }}
            >
              <Text>Управление документооборотом</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              title="📚 Справочники"
              hoverable
              style={{ textAlign: 'center' }}
            >
              <Text>Ведение справочной информации</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              title="📈 Отчеты"
              hoverable
              style={{ textAlign: 'center' }}
            >
              <Text>Аналитика и отчетность</Text>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default DashboardPage