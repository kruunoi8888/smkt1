import { supabase } from '@/lib/supabase';

export const getData = async (type: string, id?: string) => {
  try {
    if (type === 'config') {
      const { data, error } = await supabase.from('config').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data || {};
    }

    if (id) {
      const { data, error } = await supabase.from(type).select('*').eq('id', id).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } else {
      const { data, error } = await supabase.from(type).select('*');
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error(`Error fetching data for ${type}:`, error);
    return null;
  }
};

export const saveData = async (type: string, data: any) => {
  try {
    const { data: result, error } = await supabase.from(type).upsert(data).select().single();
    if (error) throw error;
    return result;
  } catch (error) {
    console.error(`Error saving data for ${type}:`, error);
    throw error;
  }
};

export const deleteData = async (type: string, id: string) => {
  try {
    const { error } = await supabase.from(type).delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error(`Error deleting data for ${type}:`, error);
    throw error;
  }
};
