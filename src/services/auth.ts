import { fetchUserDataWithToken } from "./booking";

// ฟังก์ชันนี้จะรับ getToken function จาก useAuth() hook ของ Clerk
export const fetchClerkUserData = async (getToken: Function) => {
  const token = await getToken();
  if (!token) {
    return { username: '', email: '', token: '' };
  }

  try {
    const userData = await fetchUserDataWithToken(token);
    return { username: userData.name, email: userData.email, token };
  } catch (error) {
    console.error("Error fetching user data from backend:", error);
    return { username: '', email: '', token: '' };
  }
};