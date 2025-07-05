export async function uploadImagesToCloudinary(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "room_photos_unsigned"); // ✅ ใช้ได้จาก frontend

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/duvwv8cdh/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url; // ✅ URL จะเก็บตามลำดับไฟล์
  });

  return Promise.all(uploadPromises); // ✅ ค่าที่ return กลับมา จะเรียงลำดับเหมือนใน files[]
}
