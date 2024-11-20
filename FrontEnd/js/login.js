
const urlAPILogin = "http://localhost:5678/api/users/login";
const loginForm = document.getElementById("loginForm")

// Évènement qui s'active quand on soumet le formulaire
loginForm.addEventListener('submit', userLogin);

async function userLogin(event) {
  event.preventDefault();

  let user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  // Vérifie message d'erreur déjà présent
  const activeErrorBox = document.querySelector('.errorBox');
  if (activeErrorBox) {
    activeErrorBox.remove();
  }

  // Requête vers l'API pour tenter de connecter l'utilisateur
  try {
    let response = await fetch(urlAPILogin, {
      method: 'POST', 
      body: JSON.stringify(user), 
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    // Vérifie si la connexion a échoué
    if (response.status !== 200) {
      displayErrorMessage('E-mail ou mot de passe incorrect');
    } else {
      let result = await response.json();

      // Récupération du token
      const token = result.token;

      // Stocke le token dans la session pour rester connecté
      sessionStorage.setItem('authToken', token);

      // On redirige l'utilisateur vers la page d'accueil en cas de connexion réussie
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Fonction pour afficher un message d'erreur
function displayErrorMessage(message) {
  const errorBox = document.createElement("div");
  errorBox.className = "errorBox";
  errorBox.innerHTML = message;

  // Ajoute le message d'erreur au dessus du formulaire
  document.querySelector("form").prepend(errorBox);
}