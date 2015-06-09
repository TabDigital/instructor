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

const directionClassNames = ['top', 'right', 'bottom', 'left']

function positionElementInRelation(element, relatedElement, direction) {
  element.classList.remove(...directionClassNames)
  element.classList.add(direction)

  switch (direction) {
    case 'top':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft
      break
    case 'right':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft
      break
    case 'bottom':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft
      break
    case 'left':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft
      break
  }
}

export default class Instructor {
  constructor(rootEl, options = {}) {
    this.rootEl = rootEl
    this.instructables = this.findAllInstructables()
    this.instructions = options.instructions
  }

  findAllInstructables() {
    return [].slice.apply(this.rootEl.querySelectorAll(selector))
  }

  showFirstInstructable() {
    let node = this.instructables[0]
    if (node) this.show(node)
  }

  show(node) {
    let instructions = this.instructions[node.dataset.instructable]
    if (!instructions) {
      throw new Error(`Instructor: No instructions found for ${node.classList}`)
    }
    if (!overlayElement.parentNode) this.rootEl.appendChild(overlayElement)
    overlayElement.innerHTML = overlayTemplate(instructions)
    overlayElement.classList.add('visible')
    let wrapperEl = overlayElement.firstChild
    positionElementInRelation(wrapperEl, node, 'left')
  }

  removeOverlay() {
    if (overlayElement.parentNode) {
      overlayElement.parentNode.removeChild(overlayElement)
    }
  }
}
