import { getWorks, getCategories } from './api.js'
import { openModal } from './modal.js';
import { displayProjectsGallery, createBtn, activeBtn } from './functions.js'

const works = await getWorks();
const categories = await getCategories();
const gallery = document.querySelector(".gallery")

// AFFICHAGE DES PROJETS
displayProjectsGallery(works, gallery, true);
generateFilters(categories, works)

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

/* MODE ADMINISTRATEUR */
function adminMode() {
    const authBtn = document.getElementById("authBtn")

    if (sessionStorage.authToken) {
        // Bannière "mode édition"
        if (!document.querySelector(".editMode")) {
            const editMode = document.createElement("div")
            editMode.className = "editMode"
            editMode.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>'
            document.body.prepend(editMode)
        }

        // Bouton "modifier"
        const portfolioTitle = document.querySelector("#portfolio h2")
        if (!document.querySelector(".editBtn")) {
            const editBtn = document.createElement("div")
            editBtn.className = "editBtn"
            editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'
            portfolioTitle.appendChild(editBtn)

            // Ouvrir modal
            editBtn.addEventListener('click', () => openModal('gallery'));
        }
        authBtn.textContent = "logout";
    } else {
        authBtn.textContent = "login";
    }
}

// Bouton login/logout
authBtn.addEventListener("click", () => {
    if (sessionStorage.authToken) {
        sessionStorage.removeItem("authToken")
    } 
    adminMode()
})

adminMode()