const urlAPIProjects = "http://localhost:5678/api/works"
const urlAPICategories = "http://localhost:5678/api/categories"

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

export { getWorks, getCategories }