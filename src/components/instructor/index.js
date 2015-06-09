// Instructor
// ==========

// The selector that elements need to carry in order to get the overlay. The
// value should be a unique key for the instructions object. See
// ./mock-instructions.js.
const selector = '[data-instructable]'

const overlayTemplate = function(attributes = {}) {
  return `
    <div class="instructable-wrapper">
      <h1 class="heading">${attributes.title}</h1>
      <div class="body-wrapper">${attributes.body}</div>
    </div>
  `.trim()
}

const overlayElement = document.createElement('div')
overlayElement.classList.add('instructable-overlay')

export default class Instructor {
  constructor(rootEl, options = {}) {
    this.rootEl = rootEl
    this.instructables = this.findAllInstructables()
    this.instructions = options.instructions
  }

  findAllInstructables() {
    let elements = this.rootEl.querySelectorAll(selector)
    return [].slice.apply(elements)
  }

  show(key) {
    let instructions = this.instructions[key]
    if (!instructions) {
      throw new Error(`Instructor: No instructions found for ${key}`)
    }
    if (!overlayElement.parentNode) this.rootEl.appendChild(overlayElement)
    overlayElement.innerHTML = overlayTemplate(instructions)
    overlayElement.classList.add('visible')
  }

  removeOverlay() {
    if (overlayElement.parentNode) {
      overlayElement.parentNode.removeChild(overlayElement)
    }
  }
}
