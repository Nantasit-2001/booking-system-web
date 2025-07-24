'use client'

import { useEffect, useState } from "react"
import NavBarAdmin from "@/components/AdminPage/NavBarAdmin"
import AdminGuard from "@/components/auth/AdminGuard"
import { submitDocument } from "@/services/documents"
import { fetchDocuments,DocumentItem,deleteDocument } from "@/services/documents"
import { PopupAlert } from "@/components/popup/PopupAlert"
const AdminDocuments: React.FC = () => {
  const [text, setText] = useState("")
  const [message, setMessage] = useState("")
  const [docs, setDocs] = useState<DocumentItem[]>([])
  const [error, setError] = useState<string>("")
  const [isAlert,setIsAlert] = useState<boolean>(false)
  const [idDelete,setIdDelete] = useState<number>(0)
  // ✅ ดึงข้อมูลเอกสารตอนโหลดหน้า
useEffect(() => {
  const loadDocuments = async () => {
    try {
      const data = await fetchDocuments()
      setDocs(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while loading the document.")
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
      setMessage("❌ An error occurred.")
    }
  }

  const handleDelete = async (id: number) => {
  try {
    await deleteDocument(id)
    setDocs((prev) => prev.filter((doc) => doc.id !== id))
    setMessage("✅ Deleted successfully")
  } catch (err: any) {
    console.error("Delete error:", err)
    setError(err.message || "❌ Failed to delete document")
  }finally{
    setIsAlert(false)
    setIdDelete(0)
    }
  }
  
  return (
    <AdminGuard>
      <NavBarAdmin />
       <PopupAlert
        isOpen={isAlert}
        title={"Are you sure?"}
        message={"Are you sure you want to delete this document?"}
        onClose={() => setIsAlert(false)}
        onConfirm={()=>handleDelete(idDelete)}
        showCancelButton={true}
      />  
      <section className="w-full py-10 bg-gray-100 px-40 items-center space-y-10">
        {/* 📝 แบบฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-2 border rounded"
            rows={10}
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800"
          >
            Hotel data record
          </button>
          {message && <p className="text-green-600">{message}</p>}
        </form>

       {/* 📄 รายการเอกสารที่บันทึกไว้ */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">📄 List of documents</h2>

        {error && <p className="text-red-600">{error}</p>}

        <ul className="grid grid-cols-1 gap-4">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="bg-white p-4 rounded-xl shadow-sm border relative group hover:shadow-md transition"
            >
            <button
              onClick={() => {setIsAlert(true); setIdDelete(doc.id);}}
              className="border-2 p-0.5 rounded-lg absolute top-2 right-2 text-back hover:text-red-700 text-sm cursor-pointer"
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
          <p className="text-gray-500">No recorded documents</p>
        )}
      </div>
      </section>
    </AdminGuard>
  )
}

export default AdminDocuments
