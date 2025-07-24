import { Message } from "@/components/FloatingChat"
export const askQuestionToBot = async (question: string,message:Message[],token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/ask`, {
      method: 'POST',
          headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
    },
      body: JSON.stringify({ question,message }),
    })

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`)
    }

    const data = await res.json()
    return data.answer || '❌ ระบบไม่สามารถตอบคำถามได้'
  } catch (error) {
    console.log(error)
    return '❌ เกิดข้อผิดพลาดในการติดต่อระบบ'
  }
}
