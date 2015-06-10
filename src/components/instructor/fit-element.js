// Fit element
// ===========
//
// A small library for fitting an element in the available space in the screen,
// in relation to another.

const directionClassNames = ['top', 'right', 'bottom', 'left']



export default function fitElement(element, relatedElement, direction) {
  element.classList.remove(...directionClassNames)
  element.classList.add(direction)

  switch (direction) {
    case 'top':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft +
        (relatedElement.offsetWidth / 2)
      break
    case 'right':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft +
        relatedElement.offsetWidth
      break
    case 'bottom':
      element.style.top = relatedElement.offsetTop + relatedElement.offsetHeight
      element.style.left = relatedElement.offsetLeft
      break
    case 'left':
      element.style.top = relatedElement.offsetTop
      element.style.left = relatedElement.offsetLeft
      break
  }
}
