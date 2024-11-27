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
    try {
        const urlAPIDelete = `${urlAPIProjects}/${imageId}`;
        const response = await fetch(urlAPIDelete, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error("Error:", error.message)
    }
};

export { getWorks, deleteWorks, getCategories, userAuth }