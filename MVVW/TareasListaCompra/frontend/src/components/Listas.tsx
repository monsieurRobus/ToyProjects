import { ListaTareas } from '@/types/Listas'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

type Props = {
    taskLists: ListaTareas[]
}

export const Listas = ({taskLists=[]}: Props) => {
  return (
    <nav className="flex justify-center space-x-4 my-4">
    {taskLists.map((list,index)=>
      <Link href={`/tasklist/${list.id_lista}`} key={index}>
          <Button>{list.nombre_lista}</Button>
      </Link>
      )}
  </nav>
  )
}
