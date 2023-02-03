import { api } from ".";

export async function getUser(userId: string, token: string) {
  try {
    const { data } = await api.get(`/user/${userId}?role=true`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(token: string) {
  try {
    const { data } = await api.get('/user?role=true', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}