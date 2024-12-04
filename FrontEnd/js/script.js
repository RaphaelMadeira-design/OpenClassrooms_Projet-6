import { getWorks, getCategories } from './api.js'
import { deleteWorkModal } from './modal.js'
import { displayProjectsGallery, createBtn, activeBtn } from './functions.js'

const works = await getWorks()
const categories = await getCategories()
const gallery = document.querySelector(".gallery")

// AFFICHAGE DES PROJETS
displayProjectsGallery(works, gallery, true)
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
    const filters = document.querySelector(".filters") // Récupérer les filtres

    if (sessionStorage.authToken) {
        // Afficher la bannière "mode édition"
        if (!document.querySelector(".editMode")) {
            const editMode = document.createElement("div")
            editMode.className = "editMode"
            editMode.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>'
            document.body.prepend(editMode)
        }

        // Ajouter le bouton "modifier"
        const portfolioTitle = document.querySelector("#portfolio h2")
        if (!document.querySelector(".editBtn")) {
            const editBtn = document.createElement("div")
            editBtn.className = "editBtn"
            editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'
            portfolioTitle.appendChild(editBtn)

            // Ouvrir la modal pour modifier ou supprimer les projets
            editBtn.addEventListener('click', () => deleteWorkModal())
        }

        // Masquer les filtres avec `visibility: hidden`
        if (filters) {
            filters.style.visibility = "hidden" // Cache les filtres sans retirer leur espace
        }
        // Changer le bouton en mode "logout"
        authBtn.textContent = "logout"
    } else {
        // Réinitialiser la page pour le mode utilisateur
        const editModeBanner = document.querySelector(".editMode")
        const editBtn = document.querySelector(".editBtn")

        if (editModeBanner) editModeBanner.remove() // Supprimer la bannière
        if (editBtn) editBtn.remove() // Supprimer le bouton "modifier"

        // Réafficher les filtres
        filters.classList.remove('hidden')

        // Changer le bouton en mode "login"
        authBtn.textContent = "login"
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