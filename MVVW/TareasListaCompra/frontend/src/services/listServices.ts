import { httpPost } from "@/utils/httpCalls"
import { revalidatePath } from "next/cache"

export async function createList(formData: FormData) {
    const name = formData.get('name_list') as string
    const description = formData.get('description') as string

    const data = httpPost('http://localhost:3001/tasklist', { name, description })
    

    revalidatePath('/tasklist')
    return { message: `Lista "${name}" creada con éxito` }
}
