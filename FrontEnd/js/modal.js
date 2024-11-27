import { getWorks, deleteWorks, getCategories } from './api.js'
import { displayProjectsGallery } from './functions.js'

const works = await getWorks()

const modal = document.querySelector('.modal')
const modalContent = modal.querySelector('.modal-content')
const backBtn = modal.querySelector('.back-btn')
const modalTitle = document.createElement('h3')
const separator = document.createElement('hr')
const actionButton = document.createElement('button')

const deleteWorkModal = () => {
    modal.style.display = 'flex'
    backBtn.style.display = 'none'
    modalContent.innerHTML = ''

    // Fermer la modale
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation)

    // Titre de la modale
    modalTitle.classList.add('modal-title')
    modalContent.appendChild(modalTitle)
    modalTitle.textContent = 'Galerie photo'

    // Création de modal-gallery
    let modalGallery = modal.querySelector('.modal-gallery')
    modalGallery = document.createElement('div')
    modalGallery.classList.add('modal-gallery')
    modalContent.appendChild(modalGallery)

    if (works) {
        displayProjectsGallery(works, modalGallery, false, true) // Passer 'true' pour activer le mode modale
    }

    // Séparateur
    modalContent.appendChild(separator)
    // Bouton bas
    actionButton.classList.add('modal-btn')
    actionButton.textContent = 'Ajouter une photo'
    actionButton.addEventListener('click', () => addWorkModal())
    modalContent.appendChild(actionButton)

    // Icone delete
    const modalGalleryImg = modalGallery.querySelectorAll('img')
    modalGalleryImg.forEach(modalImg => {
        const modalFigure = modalImg.closest('figure')
        if (modalFigure) {
            const deleteImg = document.createElement('delete-img')
            deleteImg.classList.add('delete-img')
            const deleteImgIcon = document.createElement('i')
            deleteImgIcon.classList.add('fa-solid', 'fa-trash-can')
            deleteImg.appendChild(deleteImgIcon)

            modalFigure.style.position = 'relative'
            modalFigure.appendChild(deleteImg)

            deleteImg.addEventListener('click', async (event) => {
                event.stopPropagation()

                const imageId = modalImg.dataset.id
                const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")
                if (confirmation) {
                    try {
                        const deleteSuccess = await deleteWorks(imageId)
                        if (deleteSuccess) {
                            modalFigure.remove() // Retirer l'image de la modale

                            // Retirer également l'image de la galerie principale
                            const galleryFigure = document.querySelector(`img[data-id="${imageId}"]`)
                            if (galleryFigure) {
                                galleryFigure.closest('figure').remove()
                            }
                        } else {
                            alert("La suppression a échoué.")
                        }
                    } catch (error) {
                        console.error("Erreur lors de la suppression :", error.message)
                        alert("Une erreur est survenue lors de la suppression.")
                    }
                }
            })
        }
    })
}

const addWorkModal = () => {
    modal.style.display = 'flex'
    backBtn.style.display = 'flex'
    backBtn.addEventListener('click', deleteWorkModal)
    modalContent.innerHTML = ''

    // Fermer la modale
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation)

    // Titre de la modale
    modalTitle.classList.add('modal-title')
    modalContent.appendChild(modalTitle)
    modalTitle.textContent = 'Ajout photo'

    // Séparateur
    modalContent.appendChild(separator)
    // Bouton bas
    actionButton.classList.add('modal-btn')
    actionButton.textContent = 'Valider'
    modalContent.appendChild(actionButton)
}


const closeModal = (event) => {
    event.preventDefault()
    modal.style.display = 'none'
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation)
}

const stopPropagation = (event) => {
    event.stopPropagation()
}

window.addEventListener('keydown', function (press) {
    if (press.key === 'Escape' || press.key === 'Esc') {
        closeModal(press)
    }
})

export { deleteWorkModal, closeModal }