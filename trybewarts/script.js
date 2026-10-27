const email = document.querySelector('#email-login');
const password = document.querySelector('#password-login');
const buttonLogin = document.querySelector('#button-login');
// const header = document.querySelector('.header');

// // Requisito 2
// function Logo() {
//   const imgLogo = document.createElement('img');
//   imgLogo.className = 'trybewarts-header-logo';
//   imgLogo.src = 'images/trybewarts-header-logo.svg';
//   header.appendChild(imgLogo);
// }Logo();

// Requisito 3
buttonLogin.addEventListener('click', () => {
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

window.addEventListener('click', (event) => {
  console.log(event);
});

const checkbox = document.querySelector('#agreement');
const submit = document.querySelector('#submit-btn');
checkbox.addEventListener('click', () => {
  if (checkbox.checked === true) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
});

// Requisito 20:
function counterTextAreaValue() {
  const counter = document.createElement('span');
  counter.id = 'counter';
  counter.innerText = 500;
  document.getElementById('div-comments').appendChild(counter);

  const targetText = document.getElementById('textarea');

  targetText.addEventListener('keyup', () => {
    const caractersInputed = targetText.value.length;

    if (counter.innerText <= 500) {
      counter.innerText = 500 - caractersInputed;
    }
  });
}counterTextAreaValue();

// Requisito 21:
const form = document.querySelector('#evaluation-form');

// Pegar o valor da Família
function gettingFamilyValues() {
  const frontend = document.querySelector('#frontend');
  const backend = document.querySelector('#backend');
  const fullstack = document.querySelector('#fullstack');
  let familyValue = '';
  if (frontend.checked === true) {
    familyValue = document.querySelector('#frontend').value;
  } else if (backend.checked === true) {
    familyValue = document.querySelector('#backend').value;
  } else if (fullstack.checked === true) {
    familyValue = document.querySelector('#fullstack').value;
  }
  return familyValue;
}

// Pegar o valor da tech:
function gettingTechValues() {
  const techs = document.querySelectorAll('.checkbox');
  let techsChecked = '';
  for (let index = 0; index < techs.length; index += 1) {
    if (techs[index].checked === true) {
      techsChecked += `${techs[index].value}, `;
    }
  }
  return techsChecked;
}

// Pegar o valor da avaliação:
function gettingRatingValue() {
  const ratingButtons = document.querySelectorAll('.rate-button');
  let ratingValue = '';
  for (let index = 0; index < ratingButtons.length; index += 1) {
    if (ratingButtons[index].checked === true) {
      ratingValue = ratingButtons[index].value;
    }
  }
  return ratingValue;
}

// Colocar todos os valores em um objeto:
function gettingValues() {
  const name = document.querySelector('#input-name');
  const lastName = document.querySelector('#input-lastname');
  const allValues = {
    Nome: `${name.value} ${lastName.value}`,
    Email: `${document.querySelector('#input-email').value}`,
    Casa: `${document.querySelector('#house').value}`,
    Família: `${gettingFamilyValues()}`,
    Matérias: `${gettingTechValues()}`,
    Avaliação: `${gettingRatingValue()}`,
    Observações: `${document.querySelector('#textarea').value}`,
  };
  return allValues;
}
// Remover o form e adicionar uma section com os valores do objeto:
// source: https://www.w3schools.com/jsref/met_element_remove.asp
function addformsContent(event) {
  event.preventDefault();
  const section = document.createElement('section');
  const allValues = gettingValues();
  form.innerHTML = '';
  form.appendChild(section);
  for (let index = 0; index < 7; index += 1) {
    const p = document.createElement('p');
    p.innerText = `${Object.keys(allValues)[index]}: ${Object.values(allValues)[index]}`;
    section.appendChild(p);
  }
}

submit.addEventListener('click', addformsContent);
