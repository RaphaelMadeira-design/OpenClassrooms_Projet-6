import { getWorks, addWorks } from './api.js'
import { displayProjectsGallery, makeDeletable, refreshGalleries } from './functions.js'

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
    let modalGallery = document.createElement('div')
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
            const deleteImg = document.createElement('span')
            deleteImg.classList.add('delete-img')
            const deleteImgIcon = document.createElement('i')
            deleteImgIcon.classList.add('fa-solid', 'fa-trash-can')
            deleteImg.appendChild(deleteImgIcon)

            modalFigure.style.position = 'relative'
            modalFigure.appendChild(deleteImg)

            deleteImg.addEventListener('click', () => makeDeletable(modalImg.dataset.id))

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

const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    await addWorks(formData);
    await refreshGalleries();
}

export { deleteWorkModal, closeModal }