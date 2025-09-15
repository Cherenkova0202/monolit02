import React from 'react'
import { Card, Typography } from '@/shared/ui'

const { Title, Text } = Typography

const DocumentsPage: React.FC = () => {
  return (
    <Card>
      <Title level={2}>Документы</Title>
      <Text>Раздел управления документами находится в разработке</Text>
    </Card>
  )
}

export default DocumentsPage