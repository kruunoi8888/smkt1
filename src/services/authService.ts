import api from '@/services/api';

export const login = async (credentials: any) => {
  const response = await api.post('/auth.php?action=login', credentials);
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get('/auth.php?action=check');
  return response.data;
};

export const logout = async () => {
  const response = await api.get('/auth.php?action=logout');
  return response.data;
};
