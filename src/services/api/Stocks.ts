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
    throw new Error(error.response.data.message);
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
    throw new Error(error.response.data.message);
  }
}

export const createStock = async (data: CreateStock, token: string) => {
  if (!token) throw new Error('Unauthorized!');
  try {
    const { data: stock } = await api.post(`/stock`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return stock;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export const uploadStockQualityTests = async (stockId: string, data: FormData, token: string) => {
  if (!token) throw new Error('Unauthorized!');

  try {
    const res = await api.post(`/stock/qualitytest/${stockId}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });

    return res;
  } catch (error: any) {
   throw new Error(error.response.data.message)
  }
}

export const removeStockQualityTests = async (qualityTestsId: string, token: string) => {
  if (!token) throw new Error('Unauthorized!');

  try {
    const { data: stock } = await api.delete(`/stock/qualitytest/${qualityTestsId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return stock;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}