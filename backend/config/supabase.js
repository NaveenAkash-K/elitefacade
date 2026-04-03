const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  "https://cwvehpwdsliyzanqllwu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3dmVocHdkc2xpeXphbnFsbHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTU3OTksImV4cCI6MjA4OTc3MTc5OX0.Yro8Dp7voYyTlYVXsDh8ZhzOmbxkY9KwpxzE1YLN60U"
);

module.exports = supabase;
