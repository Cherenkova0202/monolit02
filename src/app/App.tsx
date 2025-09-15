import React from 'react'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { QueryProvider } from './providers/QueryProvider'
import { AppRouter } from './routing/AppRouter'
import 'antd/dist/reset.css'

const App: React.FC = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ConfigProvider>
  )
}

export default App