
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface JobOpening {
  id: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  required_skills: string[];
  experience_level?: string;
  salary_range?: string;
  job_type?: string;
  department?: string;
  posted_date: string;
  source?: string;
}

export const useJobOpenings = () => {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('job_openings')
        .select('*')
        .eq('is_active', true)
        .order('posted_date', { ascending: false })
        .limit(50);

      if (fetchError) {
        throw fetchError;
      }

      setJobOpenings(data || []);
    } catch (err: any) {
      console.error('Error fetching job openings:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to fetch job openings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshJobs = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-jobs');
      
      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Job listings refreshed successfully"
      });

      // Refresh the local data
      await fetchJobOpenings();
    } catch (err: any) {
      console.error('Error refreshing jobs:', err);
      toast({
        title: "Error", 
        description: "Failed to refresh job listings",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchJobOpenings();

    // Set up real-time subscription for new jobs
    const channel = supabase
      .channel('job-openings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_openings'
        },
        () => {
          fetchJobOpenings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    jobOpenings,
    loading,
    error,
    refreshJobs,
    refetch: fetchJobOpenings
  };
};
