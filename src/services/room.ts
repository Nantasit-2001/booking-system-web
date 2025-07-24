import { Room } from "@/types/types";
import { RoomDetailAdmin } from "@/types/types";
export interface RoomType {
    id: number;
    name: string;
    description?: string;
    price?:number
    // เพิ่ม field อื่น ๆ ตามที่ API ส่งกลับมา
}

export async function fetchRoom(): Promise<RoomDetailAdmin[]>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rooms`);
    if(!response.ok){
        throw new Error('Network response was not ok')
    }
    return response.json();
}

export async function getRoomById(id: string): Promise<RoomDetailAdmin> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rooms/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch room');
  }
  return res.json();
}

export async function updateRoom(id: string, data: RoomDetailAdmin): Promise<RoomDetailAdmin> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to update room');
  }
  return res.json();
}

export async function CreateRoom(roomData: RoomDetailAdmin): Promise<RoomDetailAdmin[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rooms/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });

  const result = await response.json();

  if (!response.ok) {
    // โยน Error พร้อมแนบ status และ error
    const error = new Error(result.error || 'Unknown error');
    (error as any).status = response.status;
    throw error;
  }

  return result;
}

export async function deleteRoom(id: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rooms/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete room');
  }
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

export async function fetchRoomsAvailable(check_in: string, check_out: string): Promise<Room[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/rooms/available`);
    url.searchParams.append('check_in', check_in);
    url.searchParams.append('check_out', check_out);

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const fetchRoomById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`);
  if (!res.ok) return null;
  return res.json();
};
