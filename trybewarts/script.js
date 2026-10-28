const STRINGS = {
  en: {
    documentTitle: 'Trybewarts admission form',
    login: {
      email: 'Email',
      password: 'Password',
      submit: 'Sign in',
      welcome: 'Hello, Tryber!',
      invalid: 'Wrong email or password.',
    },
    intro: {
      title: 'Apply to Trybewarts',
      text: 'Tell us who you are, pick your house and choose what you want to learn first.',
    },
    about: { title: 'About you', firstName: 'First name', lastName: 'Last name', email: 'Email' },
    house: { title: 'Your house' },
    family: { title: 'Your family' },
    subjects: { title: 'What do you most want to learn?' },
    rate: { title: 'How would you rate Trybewarts?', option: '{value} out of 10' },
    comments: {
      title: 'Comments',
      placeholder: 'Anything else you want us to know?',
      left: '{count} characters left',
    },
    agreement: 'I agree to the use of the information above.',
    submit: 'Send application',
    summary: {
      title: 'Application sent',
      text: 'Here is what you sent us.',
      name: 'Name',
      email: 'Email',
      house: 'House',
      family: 'Family',
      subjects: 'Subjects',
      rating: 'Rating',
      comments: 'Comments',
      none: 'Not given',
      edit: 'Start a new application',
    },
    footer: 'Trybewarts, all rights reserved.',
    projectBar: { label: 'Trybe projects', all: 'All projects', language: 'Language' },
  },
  pt: {
    documentTitle: 'Formulário de admissão da Trybewarts',
    login: {
      email: 'Email',
      password: 'Senha',
      submit: 'Entrar',
      welcome: 'Olá, Tryber!',
      invalid: 'Email ou senha inválidos.',
    },
    intro: {
      title: 'Candidate-se à Trybewarts',
      text: 'Conte quem você é, escolha sua casa e o que quer aprender primeiro.',
    },
    about: { title: 'Sobre você', firstName: 'Nome', lastName: 'Sobrenome', email: 'Email' },
    house: { title: 'Sua casa' },
    family: { title: 'Sua família' },
    subjects: { title: 'O que você está com mais vontade de aprender?' },
    rate: { title: 'Como você avalia a Trybewarts?', option: '{value} de 10' },
    comments: {
      title: 'Comentários',
      placeholder: 'Mais alguma coisa que você queira contar?',
      left: 'Restam {count} caracteres',
    },
    agreement: 'Concordo com o uso das informações acima.',
    submit: 'Enviar candidatura',
    summary: {
      title: 'Candidatura enviada',
      text: 'Isto é o que você nos enviou.',
      name: 'Nome',
      email: 'Email',
      house: 'Casa',
      family: 'Família',
      subjects: 'Matérias',
      rating: 'Avaliação',
      comments: 'Comentários',
      none: 'Não informado',
      edit: 'Começar uma nova candidatura',
    },
    footer: 'Trybewarts, todos os direitos reservados.',
    projectBar: { label: 'Projetos da Trybe', all: 'Todos os projetos', language: 'Idioma' },
  },
};

// Same key as the portfolio and the other apps, so one choice carries across the site.
const STORAGE_KEY = 'lang';
const MAX_COMMENT = 500;

function savedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved in STRINGS ? saved : 'en';
  } catch {
    return 'en';
  }
}

let language = savedLanguage();

function t(key, values = {}) {
  const text = key.split('.').reduce((node, part) => (node == null ? node : node[part]), STRINGS[language]);
  if (typeof text !== 'string') return key;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in values ? values[name] : match));
}

const form = document.querySelector('#evaluation-form');
const submit = document.querySelector('#submit-btn');
const agreement = document.querySelector('#agreement');
const comments = document.querySelector('#textarea');
const counter = document.querySelector('#counter');
const rating = document.querySelector('#rating');
const loginStatus = document.querySelector('#login-status');

function updateCounter() {
  counter.textContent = t('comments.left', { count: MAX_COMMENT - comments.value.length });
}

function buildRating() {
  for (let value = 1; value <= 10; value += 1) {
    const label = document.createElement('label');
    label.className = 'rate';
    label.innerHTML = `<input type="radio" name="rate" value="${value}" class="rate-button"><span>${value}</span>`;
    rating.appendChild(label);
  }
}

function applyLanguage() {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.querySelectorAll('.rate-button').forEach((input) => {
    input.setAttribute('aria-label', t('rate.option', { value: input.value }));
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
  if (loginStatus.dataset.key) loginStatus.textContent = t(loginStatus.dataset.key);
  if (counter) updateCounter();
}

function setLanguage(next) {
  language = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice just won't persist.
  }
  applyLanguage();
  const summary = document.querySelector('.summary');
  if (summary) summary.replaceWith(renderSummary(JSON.parse(summary.dataset.values)));
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

document.querySelector('.trybewarts-login').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;
  const ok = email === 'tryber@teste.com' && password === '123456';
  loginStatus.dataset.key = ok ? 'login.welcome' : 'login.invalid';
  loginStatus.classList.toggle('is-error', !ok);
  loginStatus.textContent = t(loginStatus.dataset.key);
});

agreement.addEventListener('change', () => {
  submit.disabled = !agreement.checked;
});

comments.addEventListener('input', updateCounter);

function collectValues() {
  const checked = (selector) => document.querySelector(`${selector}:checked`)?.value || '';
  return {
    name: `${form.firstName.value} ${form.lastName.value}`.trim(),
    email: form.email.value.trim(),
    house: checked('[name="house"]'),
    family: checked('[name="family"]'),
    subjects: [...document.querySelectorAll('.subject:checked')].map((input) => input.value),
    rating: checked('[name="rate"]'),
    comments: comments.value.trim(),
  };
}

function renderSummary(values) {
  const section = document.createElement('section');
  section.className = 'summary letter';
  section.dataset.values = JSON.stringify(values);
  section.setAttribute('aria-labelledby', 'summary-title');

  const title = document.createElement('h2');
  title.id = 'summary-title';
  title.textContent = t('summary.title');
  title.tabIndex = -1;
  const text = document.createElement('p');
  text.textContent = t('summary.text');

  const list = document.createElement('dl');
  const rows = [
    ['name', values.name],
    ['email', values.email],
    ['house', values.house],
    ['family', values.family],
    ['subjects', values.subjects.join(', ')],
    ['rating', values.rating && `${values.rating} / 10`],
    ['comments', values.comments],
  ];
  rows.forEach(([key, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = t(`summary.${key}`);
    const dd = document.createElement('dd');
    dd.textContent = value || t('summary.none');
    list.append(dt, dd);
  });

  const again = document.createElement('button');
  again.type = 'button';
  again.textContent = t('summary.edit');
  again.addEventListener('click', () => {
    form.reset();
    submit.disabled = true;
    updateCounter();
    section.replaceWith(form);
  });

  section.append(title, text, list, again);
  return section;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!agreement.checked) return;
  const summary = renderSummary(collectValues());
  form.replaceWith(summary);
  summary.querySelector('h2').focus({ preventScroll: true });
});

buildRating();
applyLanguage();
