import { displayErrorMessage } from './functions.js'

const urlAPILogin = "http://localhost:5678/api/users/login";
const loginForm = document.getElementById("loginForm")

// Évènement qui s'active quand on soumet le formulaire
loginForm.addEventListener('submit', userLogin);

async function userLogin(event) {
  event.preventDefault();

  // Récupère les valeurs des champs du formulaire
  let userInfo = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  // Vérifie s'il y a déjà un message d'eereur sur la page
  const activeErrorBox = document.querySelector('.errorBox');
  if (activeErrorBox) {
    activeErrorBox.remove();
  }

  // Requête vers l'API pour connecter l'utilisateur
  try {
    let response = await fetch(urlAPILogin, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo),
    });

    if (response.status !== 200) {
      displayErrorMessage();
    } else {
      let result = await response.json();

      const token = result.token;
      sessionStorage.setItem('authToken', token);

      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}