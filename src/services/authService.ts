import { supabase } from '@/lib/supabase';

// We implement minimal authentication check against the `admin_users` table
export const login = async (credentials: any) => {
  try {
    const { username, password } = credentials;
    
    // Master Admin fallback (Locked by Developer)
    if (username === 'admin' && password === 'kn@25180508') {
      const masterAdmin = {
        id: 'admin_master',
        username: 'admin',
        name: 'Mr.Ratchapol Worrakan',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander',
        phone: '0815144041',
        email: 'kruunoi@gmail.com',
        isDefault: true
      };
      localStorage.setItem('admin_user', JSON.stringify(masterAdmin));
      return { success: true, isLoggedIn: true, user: masterAdmin };
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
      
    if (data) {
      localStorage.setItem('admin_user', JSON.stringify(data));
      return { success: true, isLoggedIn: true, user: data };
    } else {
      return { success: false, isLoggedIn: false, error: "Invalid credentials" };
    }
  } catch (err) {
    console.error("Login lookup error:", err);
    return { success: false, isLoggedIn: false, error: "Server error or invalid credentials" };
  }
};

export const checkAuth = async () => {
  const userStr = localStorage.getItem('admin_user');
  if (userStr) {
    return { success: true, isLoggedIn: true, user: JSON.parse(userStr) };
  }
  return { success: false, isLoggedIn: false };
};

export const logout = async () => {
  localStorage.removeItem('admin_user');
  return { success: true, isLoggedIn: false };
};
