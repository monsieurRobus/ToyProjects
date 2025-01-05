import { Task } from "@/types/Task"
import { httpPost } from "@/utils/httpCalls"
import { revalidatePath } from "next/cache"

export async function createList(formData: FormData) {
    const name = formData.get('name_list') as string
    const description = formData.get('description') as string

    const data = httpPost('http://localhost:3001/tasklist', { nombre_lista: name, descripcion: description })
    

    return { message: `Lista "${name}" creada con éxito` }
}

export async function createTask(id:string|number,data: Task) {
    
    const titulo: string = data.titulo as string
    const descripcion: string = data.descripcion as string

    console.log(data)

    await httpPost('http://localhost:3001/tasklist/'+id, { titulo: titulo, completada: false, descripcion: descripcion ?? ''})
    

    return { message: `Tarea "${titulo}" creada con éxito` }
}