export async function requestToken() {
  const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  try {
    const request = await fetch(TOKEN_ENDPOINT);
    const resolvedToken = await request.json();
    localStorage.setItem('token', JSON.stringify(resolvedToken.token));
    return resolvedToken.token;
  } catch (e) {
    console.log(e);
  }
}

export async function getCategoryID(whichCategory) {
  const CATEGORIES_ENDPOINT = 'https://opentdb.com/api_category.php';
  try {
    const categoriesData = await fetch(CATEGORIES_ENDPOINT);
    const { trivia_categories: categories } = await categoriesData.json();
    const filtered = categories.find((category) => category.name.includes(whichCategory));
    return filtered.id;
  } catch (e) {
    console.log(e);
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

export async function getQuestions(nQuestions, cat = '', token, retries = 1) {
  const catID = await getCategoryID(cat);
  const definedCategory = cat ? `&category=${catID}` : '';
  const TRIVIA_ENDPOINT = `https://opentdb.com/api.php?amount=${nQuestions}${definedCategory}&token=${token}`;
  try {
    const data = await fetch(TRIVIA_ENDPOINT);
    const json = await data.json();
    if (json.response_code === RATE_LIMITED && retries > 0) {
      await wait(RATE_LIMIT_MS);
      return getQuestions(nQuestions, cat, token, retries - 1);
    }
    if (json.results) json.results = json.results.map(decodeQuestion);
    return json;
  } catch (error) {
    console.log(error);
  }
}
