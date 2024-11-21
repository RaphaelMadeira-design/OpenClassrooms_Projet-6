import { getWorks, getCategories } from './api.js'
import { displayProjectsGallery } from './functions.js'

const works = await getWorks();
const categories = await getCategories();
const gallery = document.querySelector(".gallery")

// AFFICHAGE DES PROJETS
displayProjectsGallery(works, gallery);
generateFilters(categories, works)  // Crée les filtres avec les catégories

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
    const allBtn = createBtn("Tous", () => {
        displayProjectsGallery(projects, gallery)
        activeBtn(allBtn)
    })
    filters.appendChild(allBtn)

    categories.forEach(category => {
        const filterBtn = createBtn(category.name, () => {
            const filteredProjects = projects.filter(project => project.categoryId === category.id)
            displayProjectsGallery(filteredProjects, gallery)
            activeBtn(filterBtn)
        })
        filters.appendChild(filterBtn)
    })

    activeBtn(allBtn)
}

function adminMode() {
    const authBtn = document.getElementById("authBtn")

    if (sessionStorage.authToken) {
        (!document.querySelector(".editMode"))
        const editMode = document.createElement("div")
        editMode.className = "editMode"
        editMode.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>'
        document.body.prepend(editMode)
        authBtn.textContent = "logout"
    } else {
        authBtn.textContent = "login"
    }
}

authBtn.addEventListener("click", () => {
    if (sessionStorage.authToken) {
        sessionStorage.removeItem("authToken")
    }

    adminMode()
});

adminMode()