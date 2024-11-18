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

export { displayProjectsGallery }