'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createList } from '@/app/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? 'Creando...' : 'Crear Lista'}
    </button>
  )
}

export default function CreateListForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await createList(formData)
    setMessage(result.message)
  }

  return (
    <form action={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Lista</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de la Lista
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <SubmitButton />
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  )
}

