
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://gqsmjpzozjzjpzxzehbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxc21qcHpvemp6anB6eHplaGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODM2MjQsImV4cCI6MjA1ODQ1OTYyNH0.wH7xD86J9OTx6eruGJ6cKMOLpJ9--qAe0uotnAnuSL4';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper function to check if user is admin - adding more admin emails for testing
export const isUserAdmin = (email?: string | null) => {
  const adminEmails = [
    'ommishra782725@hotmail.com',
    'omgamer86@gmail.com', // Adding alternative admin email
    'test@admin.com' // Adding a test admin email
  ];
  
  return email ? adminEmails.includes(email.toLowerCase()) : false;
};
