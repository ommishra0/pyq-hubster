
import { supabase } from "@/lib/supabase";

export interface LeaderboardUser {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  total_points: number;
  tests_taken: number;
  rank_position: number;
  average_score: number;
  last_rank_change: 'up' | 'down' | 'same';
}

export const fetchLeaderboard = async (period: 'all-time' | 'monthly' | 'weekly' = 'all-time'): Promise<LeaderboardUser[]> => {
  try {
    let query = supabase
      .from('user_scores')
      .select(`
        id,
        user_id,
        total_points,
        tests_taken,
        correct_answers,
        total_questions,
        average_score,
        rank_position,
        last_rank_change,
        updated_at,
        auth.users (email, raw_user_meta_data)
      `)
      .order('rank_position', { ascending: true });

    // Add time period filter
    if (period === 'monthly') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      query = query.gte('updated_at', oneMonthAgo.toISOString());
    } else if (period === 'weekly') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      query = query.gte('updated_at', oneWeekAgo.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return (data || []).map(item => {
      const userData = item.users as any;
      return {
        id: item.id,
        user_id: item.user_id,
        name: userData?.raw_user_meta_data?.name || userData?.email || 'Anonymous User',
        total_points: item.total_points,
        tests_taken: item.tests_taken,
        rank_position: item.rank_position || 0,
        average_score: item.average_score,
        last_rank_change: item.last_rank_change as 'up' | 'down' | 'same',
      };
    });
  } catch (error) {
    console.error('Error in fetchLeaderboard:', error);
    return [];
  }
};

export const fetchUserRank = async (userId: string): Promise<LeaderboardUser | null> => {
  try {
    const { data, error } = await supabase
      .from('user_scores')
      .select(`
        id,
        user_id,
        total_points,
        tests_taken,
        correct_answers,
        total_questions,
        average_score,
        rank_position,
        last_rank_change,
        updated_at,
        auth.users (email, raw_user_meta_data)
      `)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user rank:', error);
      return null;
    }

    if (!data) return null;

    const userData = data.users as any;
    
    return {
      id: data.id,
      user_id: data.user_id,
      name: userData?.raw_user_meta_data?.name || userData?.email || 'Anonymous User',
      total_points: data.total_points,
      tests_taken: data.tests_taken,
      rank_position: data.rank_position || 0,
      average_score: data.average_score,
      last_rank_change: data.last_rank_change as 'up' | 'down' | 'same',
    };
  } catch (error) {
    console.error('Error in fetchUserRank:', error);
    return null;
  }
};
