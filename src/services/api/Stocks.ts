import { api } from ".";

export const getStocks = async (token: string) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data } = await api.get('/stock', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getStockByID = async (stockId: string, token: string, options?: { stockDestiny?: boolean, qualityTests?: boolean }) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data } = await api.get(`/stock/${stockId}?${options?.stockDestiny ? 'stockDestiny=true' : ''}${options?.qualityTests ? '&qualityTests=true' : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}