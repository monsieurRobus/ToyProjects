import CreateTaskForm from '@/components/CreateTaskForm'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className={'box-content flex flex-col gap-6 p-4'}>
      <h1 className={'font-semibold text-3xl'}>Añade tarea a una lista</h1>
        <CreateTaskForm />
    </div>
  )
}

export default page