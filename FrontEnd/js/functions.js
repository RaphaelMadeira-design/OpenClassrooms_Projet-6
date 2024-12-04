import { deleteWorks, getWorks, addWorks } from "./api.js"
import { closeModal } from "./modal.js"

/* POUR L'ANCRE CONTACT DEPUIS PAGE LOGIN */
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const goToHash = () => {
            const anchor = document.querySelector(window.location.hash)
            if (anchor) {
                anchor.scrollIntoView()
            }
        }

        const checkDOMContentLoaded = setInterval(() => {
            const anchor = document.querySelector(window.location.hash)
            if (anchor) {
                clearInterval(checkDOMContentLoaded)
                goToHash()
            }
        }, 100)
    }
})

const displayProjectsGallery = (projects, container, displayFigcaption = true, isModal = false) => {
    if (!container) {
        console.error("Conteneur non défini pour afficher la galerie.")
        return
    }
    container.innerHTML = '' // Vide le conteneur précédent

    projects.forEach((project) => {
        const figure = document.createElement('figure')
        const figureImg = document.createElement('img')
        figureImg.src = project.imageUrl
        figureImg.alt = project.title
        figureImg.dataset.id = project.id

        figure.append(figureImg)

        if (displayFigcaption) {
            const figcaption = document.createElement('figcaption')
            figcaption.textContent = project.title
            figure.append(figcaption)
        }

        if (isModal) {
            const trashIconWrapper = document.createElement('div')
            trashIconWrapper.classList.add('delete-img')

            const trashIcon = document.createElement('i')
            trashIcon.classList.add('fa-solid', 'fa-trash-can')
            trashIconWrapper.appendChild(trashIcon)

            figure.style.position = 'relative'
            figure.appendChild(trashIconWrapper)

            trashIconWrapper.addEventListener('click', () => makeDeletable(project.id))
        }
        container.appendChild(figure)
    })
}

// LE BOUTON DE FILTRES
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

// MESSAGE D'ERREUR DE CONNEXION
function displayErrorMessage() {
    // Vérifie s'il y a déjà un message d'erreur
    const activeErrorBox = document.querySelector(".errorBox")
    if (activeErrorBox) {
        activeErrorBox.remove() // Supprime l'ancien message d'erreur
    }
    // Crée un nouvel élément d'erreur
    const errorBox = document.createElement('div')
    errorBox.className = 'errorBox'
    errorBox.textContent = 'E-mail ou mot de passe incorrect'
    // Insère l'élément d'erreur dans le formulaire
    document.querySelector("form").prepend(errorBox)
}

const makeDeletable = async (workId) => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')
    if (confirmation) {
        try {
            await deleteWorks(workId)
            refreshGalleries()
        } catch (error) {
            console.error("Erreur lors de la suppression :", error.message)
            alert("Une erreur est survenue lors de la suppression.")
        }
        alert('Votre image a bien été supprimée')
        closeModal() // Fermer la modale
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const success = await addWorks(formData)
    if (success) {
        refreshGalleries() // Actualiser la galerie après succès
        alert('Votre image a bien été envoyée')
        closeModal() // Fermer la modale
    }
}

const refreshGalleries = async () => {
    const gallery = document.querySelector(".gallery")
    const modalGallery = document.querySelector(".modal-gallery")
    const projects = await getWorks()
    if (gallery) {
        displayProjectsGallery(projects, gallery, true)
    }
    if (modalGallery) {
        displayProjectsGallery(projects, modalGallery, false, true)
    }
}

// Fonction pour vérifier si le formulaire est complet
function checkFormCompletion(formElements, modalButton) {
    const titleInput = formElements.titleInput
    const categorySelect = formElements.categorySelect
    const fileInput = formElements.fileInput

    const titleFilled = titleInput.value.trim() !== ''
    const categoryFilled = categorySelect.value !== ''
    const imageFilled = fileInput.files.length > 0

    // Vérifier si le formulaire est complet
    if (titleFilled && categoryFilled && imageFilled) {
        modalButton.disabled = false // Activer le bouton si tout est rempli
        modalButton.classList.remove('disabled') // Enlever la classe disabled
    } else {
        modalButton.disabled = true // Désactiver le bouton si un champ est vide
        modalButton.classList.add('disabled') // Ajouter la classe disabled
    }
}

export { displayProjectsGallery, displayErrorMessage, createBtn, activeBtn, makeDeletable, handleSubmit, refreshGalleries, checkFormCompletion }