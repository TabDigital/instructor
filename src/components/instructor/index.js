// Instructor
// ==========

// The selector that elements need to carry in order to get the overlay. The
// value should be a unique key for the instructions object. See
// ./mock-instructions.js.
const selector = '[data-instructable]'

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
}
