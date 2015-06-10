// Instructor
// ==========

import fitElement from './fit-element'

// The selector that elements need to carry in order to get the overlay. The
// value should be a unique key for the instructions object. See
// ./mock-instructions.js.
const selector = '[data-instructable]'

const overlayTemplate = function(attributes = {}) {
  return `
    <svg class="background-image">
      <mask id="overlay-mask">
          <rect fill="white" width="100%" height="100%"/>
          <rect
            y="${attributes.top}"
            x="${attributes.left}"
            height="${attributes.height}"
            width="${attributes.width}"
            fill="black"
          />
      </mask>
      <rect mask="url(#overlay-mask)"
      width="100%"
      height="100%"
      class="overlay-mask"
      />
    </svg>
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
    window.addEventListener('resize', this.removeOverlay.bind(this), false)
  }

  _clickedOverlay(event) {
    event.stopPropagation()
    if (
      event.target.classList &&
      event.target.classList.contains('more-button')
    ) {
      this.showNextInstructable()
    } else {
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
    let attributes = this.instructions[node.dataset.instructable]
    if (!attributes) {
      throw new Error(`Instructor: No instructions found for ${node.classList}`)
    }
    if (!this.overlayElement.parentNode) {
      this.rootEl.appendChild(this.overlayElement)
    }
    attributes.top = node.offsetTop
    attributes.left = node.offsetLeft
    attributes.width = node.offsetWidth
    attributes.height = node.offsetHeight
    this.overlayElement.innerHTML = overlayTemplate(attributes)
    setTimeout(() => this.overlayElement.classList.add('visible'), 1)
    let wrapperEl = this.overlayElement.querySelector('.instructable-wrapper')
    fitElement(wrapperEl, node, 'left')
  }

  removeOverlay() {
    if (!this.overlayElement.classList.contains('visible')) return false
    if (this.overlayElement.parentNode) {
      this.overlayElement.classList.remove('visible')
      setTimeout(() => {
        this.overlayElement.parentNode.removeChild(this.overlayElement)
      }, 350)
    }
  }
}
