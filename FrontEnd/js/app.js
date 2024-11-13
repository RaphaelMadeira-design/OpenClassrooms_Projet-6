// FETCH
async function fetchProjects() {
    const urlAPI = "http://localhost:5678/api/works"
    try {
    const response = await fetch(urlAPI)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    const projects = await response.json()
    console.log(projects)
    displayProjects(projects)
    } catch (error) {
    console.error(error.message)
    }
}

// AFFICHAGE DES PROJETS
function displayProjects(projects) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    projects.forEach(project => {
            const figure = document.createElement('figure')
            const figureImg = document.createElement('img')
            const figcaption = document.createElement('figcaption')

            figureImg.src = project.imageUrl
            figureImg.alt = project.title
            figcaption.textContent = project.title

            figure.append(figureImg, figcaption)
            gallery.appendChild(figure)
        }) 
}

fetchProjects()

