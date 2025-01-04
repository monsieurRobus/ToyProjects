


export const httpGet = async (url: string) => {
    return await fetch(url).then((res) => res.json())
}

export const httpPost = async (url: string, formData: any) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(formData),
    }).then((res) => res.json())
}