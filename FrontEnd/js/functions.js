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
    container.innerHTML = '' // Vide le conteneur précédent

    projects.forEach((project) => {
        const figure = document.createElement('figure')
        const figureImg = document.createElement('img')
        figureImg.src = project.imageUrl // URL de l'image
        figureImg.alt = project.title // Texte alternatif
        figureImg.dataset.id = project.id // Ajoute l'ID de l'image

        figure.append(figureImg)

        // Ajouter une légende si `displayFigcaption` est `true`
        if (displayFigcaption) {
            const figcaption = document.createElement('figcaption')
            figcaption.textContent = project.title
            figure.append(figcaption)
        }

        // Ajouter l'icône de poubelle uniquement dans la modale
        if (isModal) {
            const trashIconWrapper = document.createElement('div')
            trashIconWrapper.classList.add('delete-img') // Classe pour l'icône de la poubelle

            const trashIcon = document.createElement('i')
            trashIcon.classList.add('fa-solid', 'fa-trash-can') // Icône FontAwesome
            trashIconWrapper.appendChild(trashIcon)

            // Positionner l'icône sur l'image (en haut à droite)
            figure.style.position = 'relative'
            figure.appendChild(trashIconWrapper)

            // Ajouter l'événement pour supprimer l'image
            trashIconWrapper.addEventListener('click', async (event) => {
                event.stopPropagation() // Empêcher la propagation du clic

                // Confirmer la suppression
                const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")
                if (!confirmation) return

                const imageId = project.id

                try {
                    // Supprimer l'image via l'API
                    const deletesuccess = await deleteWorks(imageId) // Appeler l'API pour supprimer l'image

                    if (deletesuccess) {
                        // Supprimer l'image de la modale
                        figure.remove()

                        // Supprimer l'image de la page principale
                        const galleryFigure = document.querySelector(`img[data-id="${imageId}"]`)
                        if (galleryFigure) {
                            galleryFigure.closest('figure').remove() // Supprimer l'image de la page principale
                        }

                        console.log(`L'image avec l'ID ${imageId} a été supprimée avec succès.`)
                    } else {
                        console.error("Échec de la suppression de l'image.")
                        alert("Impossible de supprimer l'image. Veuillez réessayer.")
                    }
                } catch (error) {
                    console.error("Erreur lors de la suppression :", error.message)
                    alert("Une erreur est survenue lors de la suppression.")
                }
            })
        }

        container.appendChild(figure) // Ajouter la figure au conteneur
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

function displayErrorMessage() {
    // Vérifie s'il y a déjà un message d'erreur
    const activeErrorBox = document.querySelector(".errorBox")
    if (activeErrorBox) {
        activeErrorBox.remove() // Supprime l'ancien message d'erreur
    }

    // Crée un nouvel élément d'erreur
    const errorBox = document.createElement("div")
    errorBox.className = "errorBox"
    errorBox.textContent = "E-mail ou mot de passe incorrect"

    // Insère l'élément d'erreur dans le formulaire
    document.querySelector("form").prepend(errorBox)
}

export { displayProjectsGallery, displayErrorMessage, createBtn, activeBtn }