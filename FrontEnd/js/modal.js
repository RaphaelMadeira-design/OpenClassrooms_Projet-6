let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusableElements = []

const openModal = function(event) {
    event.preventDefault()
    modal = document.querySelector('.modal')
    focusableElements = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = 'flex'
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function(event) {
    if (modal === null) return
    event.preventDefault()
    modal.style.display = 'none'
    modal.removeAttribute('aria-modal')
    modal.setAttribute('aria-hidden', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

// ACCESSIBILITÉ
const stopPropagation = function (event) {
    event.stopPropagation()
}

const focusInModal = function (event) {
    event.preventDefault()
    let index = focusableElements.findIndex(f => f === modal.querySelector(':focus'))
    if (event.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusableElements.length) {
        index = 0
    }
    if (index < 0) {
        index = focusableElements.length - 1
    }
    focusableElements[index].focus()
}

window.addEventListener('keydown', function (press) {
    if (press.key === 'Escape' || press.key === 'Esc') {
        closeModal(press)
    }
    if (press.key === 'Tab' && modal !== null) {
        focusInModal(press)
    }
})