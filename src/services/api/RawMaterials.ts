import { api } from ".";

export const getRawMaterials = async (token: string) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data } = await api.get('/rawmaterial', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getRawMaterialByID = async (rawMaterialId: string, token: string, options?: { stock: boolean }) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data } = await api.get(`/rawmaterial/${rawMaterialId}${options?.stock ? '?stock=true' : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}