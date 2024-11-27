/* POUR L'ANCRE CONTACT DEPUIS PAGE LOGIN */
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const goToHash = () => {
            const anchor = document.querySelector(window.location.hash);
            if (anchor) {
                anchor.scrollIntoView();
            }
        };

        const checkDOMContentLoaded = setInterval(() => {
            const anchor = document.querySelector(window.location.hash);
            if (anchor) {
                clearInterval(checkDOMContentLoaded);
                goToHash();
            }
        }, 100); 
    }
});

const displayProjectsGallery = (projects, container, displayFigcaption = true) => {
    container.innerHTML = '';

    projects.forEach((project) => {
        const figure = document.createElement('figure');
        const figureImg = document.createElement('img');

        figureImg.src = project.imageUrl;
        figureImg.alt = project.title;
        figureImg.dataset.id = project.id;

        figure.append(figureImg);

        // Ajouter une légende si displayFigcaptions est 'true'
        if (displayFigcaption) {
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = project.title;
            figure.append(figcaption);
        }

        container.appendChild(figure);
    });
};

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