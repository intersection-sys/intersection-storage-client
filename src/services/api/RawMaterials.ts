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
    throw new Error(error.response.data.message);
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
    throw new Error(error.response.data.message);
  }
}

export const createRawMaterial = async (data: CreateRawMaterial, token: string,) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data: rawMaterial } = await api.post(`/rawmaterial`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return rawMaterial;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export const updateRawMaterial = async (rawMaterialId: string, data: UpdateRawMaterial, token: string,) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data: rawMaterial } = await api.patch(`/rawmaterial/${rawMaterialId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return rawMaterial;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export const deleteRawMaterial = async (rawMaterialId: string, token: string,) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data: rawMaterial } = await api.delete(`/rawmaterial/${rawMaterialId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return rawMaterial;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}