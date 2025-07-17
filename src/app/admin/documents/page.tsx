'use client'

import { useEffect, useState } from "react"
import NavBarAdmin from "@/components/AdminPage/NavBarAdmin"
import AdminGuard from "@/components/auth/AdminGuard"
import { submitDocument } from "@/services/documents"
import { fetchDocuments,DocumentItem,deleteDocument } from "@/services/documents"

const AdminDocuments: React.FC = () => {
  const [text, setText] = useState("")
  const [message, setMessage] = useState("")
  const [docs, setDocs] = useState<DocumentItem[]>([])
  const [error, setError] = useState("")

  // ✅ ดึงข้อมูลเอกสารตอนโหลดหน้า
useEffect(() => {
  const loadDocuments = async () => {
    try {
      const data = await fetchDocuments()
      setDocs(data)
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดเอกสาร")
    }
  }

  loadDocuments()
}, [])

  // ✅ ส่งข้อมูลใหม่
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await submitDocument(text)
      setMessage(data.message)
      setText("")

      // หลังบันทึก เรียก fetchDocuments ใหม่เพื่ออัปเดต list
      const updatedDocs = await fetchDocuments()
      setDocs(updatedDocs)
    } catch (err) {
      console.error("Error submitting:", err)
      setMessage("❌ เกิดข้อผิดพลาด")
    }
  }

  const handleDelete = async (id: number) => {
  const confirm = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเอกสารนี้?")
  if (!confirm) return

  try {
    await deleteDocument(id)
    setDocs((prev) => prev.filter((doc) => doc.id !== id))
    setMessage("✅ ลบเรียบร้อยแล้ว")
  } catch (err: any) {
    console.error("Delete error:", err)
    setError(err.message || "❌ ลบเอกสารไม่สำเร็จ")
  }
  }
  
  return (
    <AdminGuard>
      <NavBarAdmin />
      <section className="w-full py-10 bg-gray-100 px-40 items-center space-y-10">
        {/* 📝 แบบฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-2 border rounded"
            rows={10}
            placeholder="บันทึกข้อความ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Hotel data record
          </button>
          {message && <p className="text-green-600">{message}</p>}
        </form>

       {/* 📄 รายการเอกสารที่บันทึกไว้ */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">📄 รายการเอกสาร</h2>

        {error && <p className="text-red-600">{error}</p>}

        <ul className="grid grid-cols-1 gap-4">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="bg-white p-4 rounded-xl shadow-sm border relative group hover:shadow-md transition"
            >
            <button
              onClick={() => handleDelete(doc.id)}
              className="border-2 p-0.5 rounded-lg absolute top-2 right-2 text-back hover:text-red-700 text-sm"
              title="ลบเอกสารนี้"
            >
              🗑
            </button>

            <p className="text-sm text-gray-500 mb-1">ID: {doc.id}</p>
            <p className="text-gray-800 whitespace-pre-wrap">{doc.text}</p>
          </li>
          ))}
        </ul>

        {docs.length === 0 && !error && (
          <p className="text-gray-500">ไม่มีเอกสารที่บันทึกไว้</p>
        )}
      </div>
      </section>
    </AdminGuard>
  )
}

export default AdminDocuments
