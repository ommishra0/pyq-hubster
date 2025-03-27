
import { supabase } from "@/lib/supabase";

export interface UserData {
  id: string;
  email: string;
  name: string;
  tests_taken: number;
  points: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface MockTestData {
  id: string;
  title: string;
  subject: string;
  total_questions: number;
  difficulty: string;
  created_at: string;
}

export interface QuestionData {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  marks: number;
  source_type: 'mock_test' | 'pyq' | 'book';
  source_id: string | null;
  subject: string;
  chapter: string | null;
  year: number | null;
  book_name: string | null;
  created_at: string;
}

// Admin Users
export const fetchAllUsers = async (): Promise<UserData[]> => {
  try {
    const { data: users, error: usersError } = await supabase
      .from('auth.users')
      .select('id, email, created_at, raw_user_meta_data');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return [];
    }

    const { data: scores, error: scoresError } = await supabase
      .from('user_scores')
      .select('user_id, tests_taken, total_points');

    if (scoresError) {
      console.error('Error fetching user scores:', scoresError);
    }

    const scoresMap = new Map();
    scores?.forEach(score => {
      scoresMap.set(score.user_id, {
        tests_taken: score.tests_taken,
        points: score.total_points
      });
    });

    return (users || []).map(user => {
      const userScore = scoresMap.get(user.id) || { tests_taken: 0, points: 0 };
      return {
        id: user.id,
        email: user.email,
        name: user.raw_user_meta_data?.name || 'Unnamed User',
        tests_taken: userScore.tests_taken,
        points: userScore.points,
        status: 'active',
        created_at: user.created_at
      };
    });
  } catch (error) {
    console.error('Error in fetchAllUsers:', error);
    return [];
  }
};

// Admin Mock Tests
export const fetchAllMockTests = async (): Promise<MockTestData[]> => {
  try {
    const { data, error } = await supabase
      .from('mock_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mock tests:', error);
      return [];
    }

    return (data || []).map(test => ({
      id: test.id,
      title: test.title,
      subject: test.subject,
      total_questions: test.total_questions,
      difficulty: test.difficulty,
      created_at: test.created_at
    }));
  } catch (error) {
    console.error('Error in fetchAllMockTests:', error);
    return [];
  }
};

export const createMockTest = async (mockTest: {
  title: string;
  description: string;
  subject: string;
  duration: number;
  total_questions: number;
  total_marks: number;
  difficulty: string;
  user_id: string;
}): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('mock_tests')
      .insert([
        {
          title: mockTest.title,
          description: mockTest.description,
          subject: mockTest.subject,
          duration: mockTest.duration,
          total_questions: mockTest.total_questions,
          total_marks: mockTest.total_marks,
          difficulty: mockTest.difficulty,
          created_by: mockTest.user_id
        }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error creating mock test:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error in createMockTest:', error);
    return null;
  }
};

// Admin Questions
export const fetchQuestions = async (
  source_type?: string,
  subject?: string,
  page = 1,
  limit = 20
): Promise<{ questions: QuestionData[]; total: number }> => {
  try {
    let query = supabase
      .from('questions')
      .select('*', { count: 'exact' });

    if (source_type) {
      query = query.eq('source_type', source_type);
    }

    if (subject) {
      query = query.eq('subject', subject);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching questions:', error);
      return { questions: [], total: 0 };
    }

    return {
      questions: data as QuestionData[],
      total: count || 0
    };
  } catch (error) {
    console.error('Error in fetchQuestions:', error);
    return { questions: [], total: 0 };
  }
};

export const createQuestion = async (question: {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  marks: number;
  source_type: 'mock_test' | 'pyq' | 'book';
  source_id?: string;
  subject: string;
  chapter?: string;
  year?: number;
  book_name?: string;
  user_id: string;
}): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .insert([
        {
          question_text: question.question_text,
          option_a: question.option_a,
          option_b: question.option_b,
          option_c: question.option_c,
          option_d: question.option_d,
          correct_option: question.correct_option,
          explanation: question.explanation,
          marks: question.marks,
          source_type: question.source_type,
          source_id: question.source_id || null,
          subject: question.subject,
          chapter: question.chapter || null,
          year: question.year || null,
          book_name: question.book_name || null,
          created_by: question.user_id
        }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error creating question:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error in createQuestion:', error);
    return null;
  }
};

export const deleteQuestion = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting question:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteQuestion:', error);
    return false;
  }
};

export const updateQuestion = async (
  id: string,
  updates: Partial<QuestionData>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('questions')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating question:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateQuestion:', error);
    return false;
  }
};

// CSV parsing helpers
export const parseCsvFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(value => value.trim());
          const obj: Record<string, any> = {};
          
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          
          result.push(obj);
        }
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export const uploadBulkQuestions = async (
  parsedData: any[],
  source_type: 'mock_test' | 'pyq' | 'book',
  user_id: string
): Promise<{ success: number; failed: number }> => {
  let successCount = 0;
  let failedCount = 0;

  try {
    // Process in batches to avoid overwhelming the API
    const batchSize = 20;
    for (let i = 0; i < parsedData.length; i += batchSize) {
      const batch = parsedData.slice(i, i + batchSize);
      
      const questions = batch.map(item => ({
        question_text: item.question || item.question_text,
        option_a: item.option_a || item.optionA || item.a,
        option_b: item.option_b || item.optionB || item.b,
        option_c: item.option_c || item.optionC || item.c,
        option_d: item.option_d || item.optionD || item.d,
        correct_option: (item.correct_option || item.correctOption || item.answer || '').toUpperCase().charAt(0),
        explanation: item.explanation || '',
        marks: parseInt(item.marks || '1'),
        source_type,
        source_id: item.source_id || item.test_id || null,
        subject: item.subject,
        chapter: item.chapter || null,
        year: item.year ? parseInt(item.year) : null,
        book_name: item.book_name || item.book || null,
        created_by: user_id
      }));
      
      const { data, error } = await supabase
        .from('questions')
        .insert(questions)
        .select('id');
      
      if (error) {
        console.error('Error uploading batch of questions:', error);
        failedCount += batch.length;
      } else {
        successCount += data.length;
        failedCount += batch.length - data.length;
      }
    }
    
    return { success: successCount, failed: failedCount };
  } catch (error) {
    console.error('Error in uploadBulkQuestions:', error);
    return { success: successCount, failed: failedCount + (parsedData.length - successCount - failedCount) };
  }
};
