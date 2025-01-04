import CreateTaskForm from '@/components/CreateTaskForm'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className={'p-4'}>
        <CreateTaskForm />
    </div>
  )
}

export default page