'use server'

import { revalidatePath } from 'next/cache'

export async function createList(formData: FormData) {
  const name = formData.get('name') as string
  // Aquí normalmente guardarías la lista en una base de datos
  console.log('Lista creada:', name)
  revalidatePath('/')
  return { message: `Lista "${name}" creada con éxito` }
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const listId = formData.get('listId') as string
  // Aquí normalmente guardarías la tarea en una base de datos
  console.log('Tarea creada:', title, 'para la lista:', listId)
  revalidatePath('/')
  return { message: `Tarea "${title}" creada con éxito` }
}

