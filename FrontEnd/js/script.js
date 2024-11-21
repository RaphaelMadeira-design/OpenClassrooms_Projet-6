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
    const authBtn = document.getElementById("authBtn");

    // Vérifier si l'utilisateur est connecté via sessionStorage
    if (sessionStorage.authToken) {
        const editMode = document.createElement("div")
        editMode.className = "editMode"
        editMode.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>'
        document.body.prepend(editMode) // Ajouter en haut du body
        authBtn.textContent = "logout"
    } else {
        // Mettre à jour le texte du bouton
        authBtn.textContent = "login"
    }
}

// Ajouter un gestionnaire d'événement pour le bouton Login/Logout
authBtn.addEventListener("click", () => {
    // Si l'utilisateur est connecté
    if (sessionStorage.authToken) {
        sessionStorage.removeItem("authToken") // Déconnecter l'utilisateur
    } 
    // Mettre à jour l'interface
    adminMode()
})

// Initialiser l'interface au chargement de la page
adminMode()