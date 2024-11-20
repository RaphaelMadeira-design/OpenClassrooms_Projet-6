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

const displayProjectsGallery = (projects, gallery) => {
    gallery.innerHTML = ""

    projects.forEach(function (project) {
        const figure = document.createElement('figure')
        const figureImg = document.createElement('img')
        const figcaption = document.createElement('figcaption')

        figureImg.src = project.imageUrl
        figureImg.alt = project.title
        figcaption.textContent = project.title

        figure.append(figureImg, figcaption)
        gallery.appendChild(figure)
    })
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

export { displayProjectsGallery, displayErrorMessage }