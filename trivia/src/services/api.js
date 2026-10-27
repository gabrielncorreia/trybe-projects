const BASE_URL = 'https://opentdb.com';

export async function requestToken() {
  const TOKEN_ENDPOINT = `${BASE_URL}/api_token.php?command=request`;
  try {
    const request = await fetch(TOKEN_ENDPOINT);
    const resolvedToken = await request.json();
    localStorage.setItem('token', JSON.stringify(resolvedToken.token));
    return resolvedToken.token;
  } catch (e) {
    console.log(e);
  }
}

export async function getCategories() {
  try {
    const categoriesData = await fetch(`${BASE_URL}/api_category.php`);
    const { trivia_categories: categories } = await categoriesData.json();
    return categories;
  } catch (e) {
    console.log(e);
    return [];
  }
}

// Open Trivia DB answers response_code 5 when the same IP asks again within 5 seconds.
const RATE_LIMITED = 5;
const RATE_LIMIT_MS = 5100;
const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

// The API sends HTML-encoded text (&quot;, &#039;...). A textarea decodes it without running markup.
function decodeEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

const decodeQuestion = (question) => ({
  ...question,
  category: decodeEntities(question.category),
  question: decodeEntities(question.question),
  correct_answer: decodeEntities(question.correct_answer),
  incorrect_answers: question.incorrect_answers.map(decodeEntities),
});

// options: { amount, category, difficulty, token }; empty category/difficulty means "any".
export async function getQuestions(options, retries = 1) {
  const { amount, category, difficulty, token } = options;
  const params = new URLSearchParams({ amount, token });
  if (category) params.set('category', category);
  if (difficulty) params.set('difficulty', difficulty);
  try {
    const data = await fetch(`${BASE_URL}/api.php?${params}`);
    const json = await data.json();
    if (json.response_code === RATE_LIMITED && retries > 0) {
      await wait(RATE_LIMIT_MS);
      return getQuestions(options, retries - 1);
    }
    if (json.results) json.results = json.results.map(decodeQuestion);
    return json;
  } catch (error) {
    console.log(error);
    return { response_code: -1, results: [] };
  }
}
