import { getWorks, getCategories } from './api.js'
import { displayProjectsGallery, makeDeletable, handleSubmit, refreshGalleries, checkFormCompletion } from './functions.js'

const works = await getWorks()
const categories = await getCategories()

const modal = document.querySelector('.modal')
const modalContent = modal.querySelector('.modal-content')
const backBtn = modal.querySelector('.back-btn')
const modalTitle = document.createElement('h3')
const separator = document.createElement('hr')

const deleteWorkModal = () => {
    const actionButton = document.createElement('button')
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
    refreshGalleries()
}

const addWorkModal = () => {
    modal.style.display = 'flex'
    backBtn.style.display = 'flex'
    backBtn.addEventListener('click', deleteWorkModal)
    modalContent.innerHTML = ''

    // Fermer la modale lorsque l'utilisateur clique en dehors
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation)

    // Ajouter le titre de la modale
    modalTitle.classList.add('modal-title')
    modalTitle.textContent = 'Ajout photo'
    modalContent.appendChild(modalTitle)

    // Création du formulaire
    const form = document.createElement('form')
    form.id = 'add-work-form'
    form.enctype = 'multipart/form-data'
    form.classList.add('modal-form')

    // Section d'upload de l'image
    const uploadSection = document.createElement('div')
    uploadSection.classList.add('upload-section')

    // Placeholder icon (icône de l'image)
    const placeholderIcon = document.createElement('i')
    placeholderIcon.classList.add('fa-regular', 'fa-image', 'placeholder-icon')
    uploadSection.appendChild(placeholderIcon)

    // Bouton pour sélectionner le fichier
    const uploadButton = document.createElement('label')
    uploadButton.classList.add('upload-button')
    uploadButton.textContent = '+ Ajouter photo'
    uploadSection.appendChild(uploadButton)

    // Input de type file (pour l'upload d'image)
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.name = 'image'
    fileInput.accept = 'image/*' // Seulement les fichiers image
    fileInput.classList.add('file-input')
    uploadButton.appendChild(fileInput)

    // Texte pour le type de fichier
    const fileInfo = document.createElement('span')
    fileInfo.classList.add('file-info')
    fileInfo.textContent = 'jpg, png : 4mo max'
    uploadSection.appendChild(fileInfo)

    // Conteneur pour la preview de l'image
    const previewContainer = document.createElement('div')
    previewContainer.classList.add('preview-container')
    previewContainer.style.display = 'none' // Cacher la preview au départ
    uploadSection.appendChild(previewContainer)

    const previewImage = document.createElement('img')
    previewImage.classList.add('preview-image')
    previewImage.alt = 'Aperçu de l\'image'
    previewContainer.appendChild(previewImage)

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0]

        if (file && file.type.startsWith('image/')) {
            fileInfo.textContent = file.name

            // Lecture et affichage de l'image
            const reader = new FileReader()
            reader.onload = (event) => {
                previewImage.src = event.target.result

                // Modifier le padding de .upload-section lorsque l'image est prévisualisée
                uploadSection.style.padding = '0' // Supprimer le padding

                // Basculer la vue : cacher le placeholder et afficher juste la preview
                placeholderIcon.style.display = 'none'
                uploadButton.style.display = 'none'
                fileInfo.style.display = 'none'
                previewContainer.style.display = 'block'
            }
            reader.readAsDataURL(file)
        } else {
            // Revenir à l'état initial si aucun fichier valide n'est sélectionné
            fileInfo.textContent = 'Aucun fichier sélectionné'
            previewImage.src = ''

            // Réinitialiser le padding de .upload-section lorsque l'image est supprimée
            uploadSection.style.padding = '20px' // Restaurer le padding original

            placeholderIcon.style.display = 'block'
            uploadButton.style.display = 'flex'
            fileInfo.style.display = 'block'
            previewContainer.style.display = 'none'
        }

        // Vérifier l'état du formulaire
        checkFormCompletion(formElements, modalButton)
    })

    form.appendChild(uploadSection)

    // Champ de texte pour le titre
    const titleGroup = document.createElement('div')
    titleGroup.classList.add('form-group')

    const titleLabel = document.createElement('label')
    titleLabel.textContent = 'Titre'
    titleLabel.classList.add('form-label')
    titleGroup.appendChild(titleLabel)

    const titleInput = document.createElement('input')
    titleInput.type = 'text'
    titleInput.name = 'title'
    titleInput.classList.add('form-input')
    titleGroup.appendChild(titleInput)

    titleInput.addEventListener('input', () => {
        checkFormCompletion(formElements, modalButton)
    })

    form.appendChild(titleGroup)

    // Liste déroulante pour les catégories
    const categoryGroup = document.createElement('div')
    categoryGroup.classList.add('form-group')

    const categoryLabel = document.createElement('label')
    categoryLabel.textContent = 'Catégorie'
    categoryLabel.classList.add('form-label')
    categoryGroup.appendChild(categoryLabel)

    const categorySelect = document.createElement('select')
    categorySelect.name = 'category'
    categorySelect.classList.add('form-select')
    categoryGroup.appendChild(categorySelect)

    // Option vide pour éviter la sélection automatique
    const emptyOption = document.createElement('option')
    emptyOption.style.display = 'none'
    categorySelect.appendChild(emptyOption)

    // Chargement les catégories depuis l'API
    categories.forEach(category => {
        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        categorySelect.appendChild(option)
    })

    categorySelect.addEventListener('change', () => {
        checkFormCompletion(formElements, modalButton)
    })

    form.appendChild(categoryGroup)

    // Ajouter le formulaire
    modalContent.appendChild(form)

    // Séparateur
    modalContent.appendChild(separator)

    // Bouton "Valider" pour soumettre le formulaire
    const modalButton = document.createElement('button')
    modalButton.classList.add('modal-btn')
    modalButton.textContent = 'Valider'
    modalButton.setAttribute('type', 'submit')
    modalContent.appendChild(modalButton)

    // Gérer la soumission du formulaire
    form.addEventListener('submit', handleSubmit) // Appeler handleSubmit lors de la soumission

    // Utiliser le bouton pour déclencher la soumission
    modalButton.addEventListener('click', () => {
        form.requestSubmit() // Soumettre le formulaire
    })

    // Éléments pour que le formulaire soit valide
    const formElements = {
        titleInput,
        categorySelect,
        fileInput
    }

    // État du bouton au chargement de la modale
    checkFormCompletion(formElements, modalButton)
    // Refresh des éléments
    refreshGalleries()
}

const closeModal = async (event) => {
    if (event && event.preventDefault) {
        event.preventDefault()
    }
    if (modal) {
        modal.style.display = 'none'
        modal.removeEventListener('click', closeModal)
        modal.querySelector('.modal-close')?.removeEventListener('click', closeModal)
        modal.querySelector('.modal-wrapper')?.removeEventListener('click', stopPropagation)
    }
}

const stopPropagation = (event) => {
    event.stopPropagation()
}

window.addEventListener('keydown', function (press) {
    if (press.key === 'Escape' || press.key === 'Esc') {
        closeModal(press)
    }
})

// Ajout d'un gestionnaire DOMContentLoaded et gestion des événements principaux
document.addEventListener('DOMContentLoaded', async () => {
    await refreshGalleries() // Charger les galeries au démarrage
})

export { deleteWorkModal, closeModal }