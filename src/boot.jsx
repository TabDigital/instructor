// App boot code
// =============
//
// The boot code imports the high level components and attaches them to the DOM.
// These will, in turn, require their own sub-components.

import './stylesheets/index.scss'
import React from 'react'
import MainWrapper from './components/main-wrapper'
import Instructor from './components/instructor'
import mockInstructions from './components/instructor/mock-instructions'

React.render(<MainWrapper />, document.body)

let instructor = new Instructor(document.body, {
  instructions: mockInstructions
})

setTimeout(() => {
  instructor.showNextInstructable()
}, 1500)
