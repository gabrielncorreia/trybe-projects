// Translates the landing page. English lives in the HTML; this swaps in the chosen language.
const STRINGS = {
  en: {
    documentTitle: 'Trybe projects · Gabriel N. Correia',
    title: 'Trybe projects',
    language: 'Language',
    intro: 'Projects I built while learning to program at the Trybe bootcamp, in the order I made them. Each one runs in the browser, and the code for all of them is in <a href="https://github.com/gabrielncorreia/trybe-projects">this repository</a>. My current work is on my <a href="https://gabrielncorreia.github.io/">portfolio</a>.',
    open: 'Open it',
    code: 'Code',
    projects: {
      trybewarts: 'Group project: a Hogwarts-style admission form with houses, a 1 to 10 rating, a character counter and a summary of the answers, in HTML, CSS and plain JavaScript.',
      'movie-cards-library': 'My first React project: five sci-fi films as cards with a rating meter, rendered from a JSON file.',
      tryunfo: 'A Magic: The Gathering card builder with a live preview, a point budget for the stats, and a deck you can search and filter.',
      trybetunes: 'Album and song search with audio previews and a favorites list.',
      trybewallet: 'Expense wallet with live currency conversion from an exchange-rate API.',
      trivia: 'Group project: a quiz game with a timer, score and player ranking, using an external trivia API.',
      'starwars-planets': 'Star Wars planets table with combinable filters and sorting, with state managed through Context API.',
      'recipe-app': 'Group project: a food and drink recipes app with search, favorites and step-by-step cooking progress.',
    },
  },
  pt: {
    documentTitle: 'Projetos da Trybe · Gabriel N. Correia',
    title: 'Projetos da Trybe',
    language: 'Idioma',
    intro: 'Projetos que fiz enquanto aprendia a programar no bootcamp da Trybe, na ordem em que os fiz. Todos rodam no navegador, e o código de todos está <a href="https://github.com/gabrielncorreia/trybe-projects">neste repositório</a>. Meu trabalho atual está no meu <a href="https://gabrielncorreia.github.io/">portfólio</a>.',
    open: 'Abrir',
    code: 'Código',
    projects: {
      trybewarts: 'Projeto em grupo: um formulário de admissão no estilo de Hogwarts, com casas, nota de 1 a 10, contador de caracteres e um resumo das respostas, em HTML, CSS e JavaScript puro.',
      'movie-cards-library': 'Meu primeiro projeto em React: cinco filmes de ficção científica em cartões com medidor de nota, a partir de um arquivo JSON.',
      tryunfo: 'Um criador de cartas de Magic: The Gathering com prévia ao vivo, limite de pontos para os atributos e um deck com busca e filtros.',
      trybetunes: 'Busca de álbuns e músicas com prévias de áudio e lista de favoritas.',
      trybewallet: 'Carteira de despesas com conversão de moedas em tempo real a partir de uma API de câmbio.',
      trivia: 'Projeto em grupo: jogo de perguntas com timer, placar e ranking de jogadores, usando uma API externa de trivia.',
      'starwars-planets': 'Tabela de planetas de Star Wars com filtros combináveis e ordenação, com estado gerenciado via Context API.',
      'recipe-app': 'Projeto em grupo: app de receitas de comidas e bebidas com busca, favoritas e progresso de preparo passo a passo.',
    },
  },
};

// Same key as the portfolio and every app here, so one choice carries across the site.
const STORAGE_KEY = 'lang';

function savedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved in STRINGS ? saved : 'en';
  } catch {
    return 'en';
  }
}

function apply(language) {
  const strings = STRINGS[language];
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = strings.documentTitle;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = strings[el.dataset.i18n]; });
  // Only our own strings above go through innerHTML.
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = strings[el.dataset.i18nHtml]; });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', strings[el.dataset.i18nAria]);
  });
  document.querySelectorAll('.card').forEach((card) => {
    const id = card.querySelector('.card-title').textContent.trim();
    card.querySelector('.card-body > p').textContent = strings.projects[id];
    const [open, code] = card.querySelectorAll('.links a');
    open.textContent = strings.open;
    code.textContent = strings.code;
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => {
    try {
      localStorage.setItem(STORAGE_KEY, button.dataset.lang);
    } catch {
      // The choice just won't persist.
    }
    apply(button.dataset.lang);
  });
});

apply(savedLanguage());
