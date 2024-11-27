import { getWorks } from './api.js'
import { displayProjectsGallery } from './functions.js'

const works = await getWorks();

const openModal = (type = 'gallery') => {
    const modal = document.querySelector('.modal');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = '';
    const modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal-title');
    const separator = document.createElement('hr');
    const actionButton = document.createElement('button');
    modalContent.appendChild(modalTitle); 
    actionButton.classList.add('modal-btn');

    modal.style.display = 'flex'; 
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation);

    // Création de modal-gallery
    let modalGallery = modal.querySelector('.modal-gallery');
    if (!modalGallery) {
        modalGallery = document.createElement('div');
        modalGallery.classList.add('modal-gallery');
        modalContent.appendChild(modalGallery);
    }

    if (type === 'gallery') {
        modalTitle.textContent = 'Galerie photo';
        if (works) {
            displayProjectsGallery(works, modalGallery, false);
        }
        actionButton.textContent = 'Ajouter une photo';
        actionButton.addEventListener('click', () => openModal('add-image'));
    }    

    if (type === 'add-image') {
        modalTitle.innerHTML = 'Ajouter une image'
    }

    modalContent.appendChild(separator);
    modalContent.appendChild(actionButton);

    // Icone delete
    const modalGalleryImg = modalGallery.querySelectorAll('img');
    modalGalleryImg.forEach(modalImg => {
        const modalFigure = modalImg.closest('figure');
        if (modalFigure) {
            const deleteImg = document.createElement('delete-img');
            deleteImg.classList.add('delete-img');
            const deleteImgIcon = document.createElement('i');
            deleteImgIcon.classList.add('fa-solid', 'fa-trash-can');
            deleteImg.appendChild(deleteImgIcon);

            modalFigure.style.position = 'relative';
            modalFigure.appendChild(deleteImg);

            deleteImg.addEventListener('click', (event) => {
                event.stopPropagation();
                modalFigure.remove();
            });
        }
    });
};

const closeModal = (event) => {
    event.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation);
};

const stopPropagation = (event) => {
    event.stopPropagation();
};

window.addEventListener('keydown', function (press) {
    if (press.key === 'Escape' || press.key === 'Esc') {
        closeModal(press)
    }
});

export { openModal, closeModal }