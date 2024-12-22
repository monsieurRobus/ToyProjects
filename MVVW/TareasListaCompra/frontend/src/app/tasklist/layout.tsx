import { FloatingActionButton } from '@/components/FloatingActionButton'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <main>
        <FloatingActionButton />
        {children}
    </main>
  )
}

export default layout