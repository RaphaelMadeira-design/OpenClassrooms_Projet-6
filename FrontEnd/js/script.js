// URL des deux API
const urlAPIProjects = "http://localhost:5678/api/works"
const urlAPICategories = "http://localhost:5678/api/categories"

// FETCH
async function fetchData() {
    try {
        const projectsResponse = await fetch(urlAPIProjects)
        const categoriesResponse = await fetch(urlAPICategories)

        if (!projectsResponse.ok) {
            throw new Error(`Response status for products: ${projectsResponse.status}`)
          }
          if (!categoriesResponse.ok) {
            throw new Error(`Response status for categories: ${categoriesResponse.status}`)
          }

        const projects = await projectsResponse.json()
        const categories = await categoriesResponse.json()
        
        console.log('Tableau Projets :', projects)
        console.log('Tableau Catégories :', categories)
        displayProjects(projects)  // Affiche tous les projets
        generateFilters(categories, projects)  // Crée les filtres avec les catégories

    } catch (error) {
        console.error("Erreur:", error.message)
    }
}

// AFFICHAGE DES PROJETS
function displayProjects(projects) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    projects.forEach(function (project) {
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

// LE BOUTON
function createBtn(text, onClick) {
    const button = document.createElement("button")
    button.textContent = text
    button.addEventListener("click", onClick)
    return button
}

// LE BOUTON ACTIF
function activeBtn(button) {
    const buttons = document.querySelectorAll(".filters button")
    buttons.forEach(function (btn) {
        btn.classList.remove("active")
    })

    button.classList.add("active")
}

// ASSIGNER LES BOUTONS AUX FILTRES
function generateFilters(categories, projects) {
    const filters = document.querySelector(".filters")
    filters.innerHTML = ""
    // Création du bouton "Tous"
    const allBtn = createBtn("Tous", function () {
        displayProjects(projects)
        activeBtn(allBtn)
    })
    filters.appendChild(allBtn)

    categories.forEach(function (category) {
        const filterBtn = createBtn(category.name, function () {
            const filteredProjects = projects.filter(function (project) {
                return project.categoryId === category.id
            })
            displayProjects(filteredProjects)
            activeBtn(filterBtn)
        })
        filters.appendChild(filterBtn)
    })

    activeBtn(allBtn)
}

fetchData()