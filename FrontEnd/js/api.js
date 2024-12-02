const urlAPI = "http://localhost:5678/api"

const getWorks = async () => {
    try {
        const response = await fetch(`${urlAPI}/works`)
        const works = await response.json()
        return works
    } catch (error) {
        console.error("Error:", error.message)
    }
}

const getCategories = async () => {
    try {
        const response = await fetch(`${urlAPI}/categories`)
        const categories = await response.json()
        return categories
    } catch (error) {
        console.error("Error:", error.message)
    }
}

const userAuth = async (user) => {
    try {
        const response = await fetch(`${urlAPI}/users/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        })
        const userLogin = await response.json()
        if (!response.ok || !userLogin.token) throw new Error()
        return userLogin
    } catch (error) {
        console.error("Error:", error.message)
    }
}

const deleteWorks = async (workId) => {

    const token = sessionStorage.getItem("authToken") // Récupération du token
    if (!token) {
        return false
    }
    try {
        const response = await fetch(`${urlAPI}/works/${workId}`, {
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

const addWorks = async (formData) => {
    const token = sessionStorage.getItem("authToken") // Récupération du token
    if (!token) {
        return false
    }
    try {
        const response = await fetch(`${urlAPI}/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`)
        }
        return true // Si l'ajout a réussi, retourner true
    } catch (error) {
        console.error("Error:", error.message)
        return false // Retourner false en cas d'erreur
    }
}


export { getWorks, deleteWorks, getCategories, userAuth, addWorks }