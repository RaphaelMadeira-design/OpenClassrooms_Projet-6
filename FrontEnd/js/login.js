import { displayErrorMessage } from './functions.js'
import { userAuth } from './api.js'

const loginForm = document.getElementById("loginForm")

// Évènement qui s'active quand on soumet le formulaire
loginForm.addEventListener('submit', userLogin)

async function userLogin(event) {
  event.preventDefault()

  // Récupère les valeurs des champs du formulaire
  let user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  }

  // Requête API pour connecter l'utilisateur
  try {
      const result = await userAuth(user)
      // Récupère le token et stocke le token
      const token = result.token
      sessionStorage.setItem('authToken', token)

      window.location.href = 'index.html'
  } catch (error) {
    displayErrorMessage()
  }
}