'use client'

import { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { createTask, getLists } from '@/app/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
    >
      {pending ? 'Creando...' : 'Crear Tarea'}
    </button>
  )
}

export default function CreateTaskForm() {
  const [message, setMessage] = useState('')
  const [lists, setLists] = useState<{ id_lista: string; nombre_lista: string }[]>([])

  useEffect(() => {
    async function fetchLists() {
      const fetchedLists = await getLists()
      setLists(fetchedLists)
    }
    fetchLists()
  }, [])

  async function handleSubmit(formData: FormData) {
    const result = await createTask(formData)
    setMessage(result.message)
  }

  return (
    <form action={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título de la Tarea
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="listId" className="block text-sm font-medium text-gray-700">
          Lista
        </label>
        <select
          id="listId"
          name="listId"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecciona una lista</option>
          {lists.map((list) => (
            <option key={list.id_lista} value={list.id_lista}>
              {list.nombre_lista}
            </option>
          ))}
        </select>
      </div>
      <SubmitButton />
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  )
}

