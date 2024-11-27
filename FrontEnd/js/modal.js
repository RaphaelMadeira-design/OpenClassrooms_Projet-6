import { getWorks, deleteWorks } from './api.js'
import { displayProjectsGallery } from './functions.js'

const works = await getWorks()

const openModal = (type = 'gallery') => {
    const modal = document.querySelector('.modal')
    const modalContent = modal.querySelector('.modal-content')
    modalContent.innerHTML = ''
    const modalTitle = document.createElement('h3')
    modalTitle.classList.add('modal-title')
    const separator = document.createElement('hr')
    const actionButton = document.createElement('button')
    modalContent.appendChild(modalTitle)
    actionButton.classList.add('modal-btn')

    modal.style.display = 'flex'
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation)

    // Création de modal-gallery
    let modalGallery = modal.querySelector('.modal-gallery')
    if (!modalGallery) {
        modalGallery = document.createElement('div')
        modalGallery.classList.add('modal-gallery')
        modalContent.appendChild(modalGallery)
    }

    if (type === 'gallery') {
        modalTitle.textContent = 'Galerie photo'
        if (works) {
            displayProjectsGallery(works, modalGallery, false, true) // Passer 'true' pour activer le mode modale
        }
        actionButton.textContent = 'Ajouter une photo'
        actionButton.addEventListener('click', () => openModal('modal-add'))
    }    

    // Création de modal-add
    if (type === 'modal-add') {
        modalTitle.innerHTML = 'Ajout photo'
    }

    modalContent.appendChild(separator)
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

const closeModal = (event) => {
    event.preventDefault()
    const modal = document.querySelector('.modal')
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

export { openModal, closeModal }