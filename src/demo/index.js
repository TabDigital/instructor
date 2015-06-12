// Demo page scripts
// =================
//
// Note that this is *NOT NECESSARY* for using the library.

import Instructor from '../instructor'
import mockInstructions from '../instructor/mock-instructions'

let instructor = new Instructor(document.body, {
  instructions: mockInstructions
})

setTimeout(function() {
  instructor.showNextInstructable()
}, 1500)
