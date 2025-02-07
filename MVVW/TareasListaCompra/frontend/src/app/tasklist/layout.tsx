import { FloatingActionButton } from '@/components/FloatingActionButton'
import { FloatingGenericActionButton } from '@/components/FloatingGenericActionButton'
import React, { use } from 'react'

type Props = {
    children: React.ReactNode,
    params: Promise<{ id: string }>
}

const layout = async ({children, params}: Props) => {



  return (
    <main>
        <FloatingActionButton />
        <FloatingGenericActionButton />
        {children}
    </main>
  )
}

export default layout