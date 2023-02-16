import { api } from ".";

export const createStockDestiny = async (data: CreateStockDestiny, token: string) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data: newStockDestiny } = await api.post(`/stockdestiny`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return newStockDestiny;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export const updateStockDestiny = async (id: string, data: Partial<StockDestiny>, token: string) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data: newStockDestiny } = await api.patch(`/stockdestiny/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return newStockDestiny;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
