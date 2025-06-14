
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

serve(async (req) => {
  try {
    console.log('Cron job triggered - scheduling job fetch');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the fetch-jobs function
    const { data, error } = await supabase.functions.invoke('fetch-jobs');
    
    if (error) {
      console.error('Error calling fetch-jobs function:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Job fetch completed successfully:', data);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Daily job fetch completed',
      data 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in schedule-job-fetch:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
