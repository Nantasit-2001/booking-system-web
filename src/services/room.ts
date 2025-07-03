export interface RoomType {
    id: number;
    name: string;
    description?: string;
    price?:number
    // เพิ่ม field อื่น ๆ ตามที่ API ส่งกลับมา
}

export async function fetchRoomTypes(): Promise<RoomType[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/type`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function fetchRoomShow(): Promise<string[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/show`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    try {
        const data: string[] = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to parse JSON response');
    }
}