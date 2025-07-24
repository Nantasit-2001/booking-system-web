// utils/submitDocument.ts

export type DocumentItem = {
  id: number
  text: string
}


export const submitDocument = async (text: string): Promise<{ message: string }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/add-doc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Error ${res.status}: ${err}`)
  }

  return await res.json()
}
export const fetchDocuments = async (): Promise<DocumentItem[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/doc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error ${res.status}: ${errorText}`)
  }
  const data = await res.json()
  return data
}

// services/documents.ts

export const deleteDocument = async (id: number): Promise<void> => {
await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/doc/${id}`, {
  method: 'DELETE',
})
}
