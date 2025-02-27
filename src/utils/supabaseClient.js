import { createClient } from '@supabase/supabase-js';

// Use Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchTableData(tableName) {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    throw error;
  }

  return data || [];
}

export async function createRecord(tableName, record) {
  const { data, error } = await supabase.from(tableName).insert([record]).select();

  if (error) {
    console.error(`Error creating record in ${tableName}:`, error);
    throw error;
  }

  return data;
}

export async function updateRecord(tableName, id, record) {
  const { data, error } = await supabase
    .from(tableName)
    .update(record)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating record in ${tableName}:`, error);
    throw error;
  }

  return data;
}

export async function deleteRecord(tableName, id) {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting record from ${tableName}:`, error);
    throw error;
  }

  return true;
}
