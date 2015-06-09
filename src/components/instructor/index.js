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
      <menu class="menu">
        <button class="common-button more-button">More helpers</button>
        <button class="common-button exit-button">Exit</button>
      </menu>
    </div>
  `.trim()
}

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
    this.index = 0
    this._makeOverlayElement()
  }

  _makeOverlayElement() {
    this.overlayElement = document.createElement('div')
    this.overlayElement.classList.add('instructable-overlay')
    this.overlayElement.addEventListener(
      'click', this._clickedOverlay.bind(this)
    )
  }

  _clickedOverlay(event) {
    event.stopPropagation()
    if (
      event.target.classList &&
      (
        event.target.classList.contains('instructable-overlay') ||
        event.target.classList.contains('exit-button')
      )
    ) {
      this.removeOverlay()
    }
  }

  findAllInstructables() {
    return [].slice.apply(this.rootEl.querySelectorAll(selector))
  }

  showNextInstructable() {
    let node = this.instructables[this.index]
    if (node) this.show(node)
    if (this.index >= this.instructables.length - 1) {
      this.index = 0
    } else {
      this.index++
    }
  }

  show(node) {
    let instructions = this.instructions[node.dataset.instructable]
    if (!instructions) {
      throw new Error(`Instructor: No instructions found for ${node.classList}`)
    }
    if (!this.overlayElement.parentNode) {
      this.rootEl.appendChild(this.overlayElement)
    }
    this.overlayElement.innerHTML = overlayTemplate(instructions)
    setTimeout(() => this.overlayElement.classList.add('visible'), 1)
    let wrapperEl = this.overlayElement.firstChild
    positionElementInRelation(wrapperEl, node, 'left')
  }

  removeOverlay() {
    if (this.overlayElement.parentNode) {
      this.overlayElement.classList.remove('visible')
      setTimeout(() => {
        this.overlayElement.parentNode.removeChild(this.overlayElement)
      }, 350)
    }
  }
}
