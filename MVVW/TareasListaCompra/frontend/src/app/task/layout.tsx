import { FloatingActionButton } from '@/components/FloatingActionButton'
import { FloatingGenericActionButton } from '@/components/FloatingGenericActionButton'
import React from 'react'

type Props = {
    children: React.ReactNode,
    params: { id: string }
}

const layout = async ({children, params}: Props) => {

  return (
    <main>
        <FloatingActionButton />
        <FloatingGenericActionButton location={'/tasklist'}/>
        {children}
    </main>
  )
}

export default layout