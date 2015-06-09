// App boot code
// =============

import 'babel/polyfill'
import Instructor from './components/instructor'

window.instructor = new Instructor(document.body)
