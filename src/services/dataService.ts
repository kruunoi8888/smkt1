import api from '@/services/api';

export const getData = async (type: string, id?: string) => {
  const url = id ? `/data.php?type=${type}&id=${id}` : `/data.php?type=${type}`;
  const response = await api.get(url);
  return response.data;
};

export const saveData = async (type: string, data: any) => {
  const response = await api.post(`/data.php?type=${type}`, data);
  return response.data;
};

export const deleteData = async (type: string, id: string) => {
  const response = await api.delete(`/data.php?type=${type}&id=${id}`);
  return response.data;
};
