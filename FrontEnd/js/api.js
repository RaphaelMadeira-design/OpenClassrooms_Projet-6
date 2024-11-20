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
            method: 'POST', // Méthode HTTP utilisée (POST pour envoyer des données)
            body: JSON.stringify(user), // Convertit les données de l'utilisateur en chaîne JSON
            headers: {'Content-Type': 'application/json'}, // Indique que les données envoyées sont en format JSON
        });
        const userLogin = await response.json()
        if (!response.ok || !userLogin.token) throw new Error()
        return userLogin
    } catch (error) {
        console.error("Error:", error.message)
    }
}

export { getWorks, getCategories, userAuth }