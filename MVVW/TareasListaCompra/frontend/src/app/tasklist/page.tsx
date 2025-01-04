import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ListaTareas } from '@/types/Listas'
import { Listas } from '@/components/Listas'

export default async function  Page()   {

    const taskLists:ListaTareas[] = await fetch('http://localhost:3001/tasklist').then((res) => res.json())

  return (
    <main>
        <h1 className={'font-semibold text-3xl'}>Listas de tareas</h1>
        <Listas taskLists={taskLists} />
    </main>
  )
}

