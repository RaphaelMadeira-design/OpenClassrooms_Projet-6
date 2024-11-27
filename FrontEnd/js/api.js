const urlAPIProjects = "http://localhost:5678/api/works"
const urlAPICategories = "http://localhost:5678/api/categories"
const urlAPILogin = "http://localhost:5678/api/users/login"

const getWorks = async () => {
    try {
        const response = await fetch(urlAPIProjects)
        const works = await response.json()
        return works
    } catch (error) {
        console.error("Error:", error.message)
    }
}

const getCategories = async () => {
    try {
        const response = await fetch(urlAPICategories)
        const categories = await response.json()
        return categories
    } catch (error) {
        console.error("Error:", error.message)
    }
}

const userAuth = async (user) => {
    try {
        const response = await fetch(urlAPILogin, {
            method: 'POST', 
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
        })
        const userLogin = await response.json()
        if (!response.ok || !userLogin.token) throw new Error()
        return userLogin
    } catch (error) {
        console.error("Error:", error.message)
    }
}

const deleteWorks = async (imageId) => {

    const token = sessionStorage.getItem("authToken") // Récupération du token
    if (!token) {
        return false
    }
    try {
        const urlAPIDelete = `${urlAPIProjects}/${imageId}`
        const response = await fetch(urlAPIDelete, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`)
        }
        return true // Si la suppression a réussi, retourner true
    } catch (error) {
        console.error("Error:", error.message)
        alert("Erreur lors de la suppression de l'image. Vérifiez votre connexion.")
        return false // Retourner false en cas d'erreur
    }
}

const postWorks = async (imageData) => {
    try {
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData), // Envoi de l'image et ses données
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'image.');
      }
  
      const newImage = await response.json();
      // Mettre à jour la galerie avec la nouvelle image
      works.push(newImage);
      displayProjectsGallery(works, gallery);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'image :', error.message);
    }
  };



export { getWorks, deleteWorks, postWorks, getCategories, userAuth }