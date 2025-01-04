


export const httpGet = async (url: string) => {
    return await fetch(url).then((res) => res.json())
}

export const httpPost = async (url: string, formData: FormData) => {
    return await fetch(url, {
        method: 'POST',
        body: formData
    }).then((res) => res.json())
}