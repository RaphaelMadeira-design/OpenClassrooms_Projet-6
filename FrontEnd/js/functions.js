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
    const errorBox = document.createElement("div");
    errorBox.className = "errorBox"; 
    errorBox.innerHTML = "E-mail ou mot de passe incorrect"; 
    document.querySelector("form").prepend(errorBox);
}

export { displayProjectsGallery, displayErrorMessage }