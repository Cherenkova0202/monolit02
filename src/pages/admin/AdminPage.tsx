import React from 'react'
import { Card, Typography } from '@/shared/ui'

const { Title, Text } = Typography

const AdminPage: React.FC = () => {
  return (
    <Card>
      <Title level={2}>Администрирование</Title>
      <Text>Раздел администрирования находится в разработке</Text>
    </Card>
  )
}

export default AdminPage