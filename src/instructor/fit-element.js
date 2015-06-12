// Fit element
// ===========
//
// A small library for fitting an element in the available space in the screen,
// in relation to another.

const directionClassNames = ['top', 'right', 'bottom', 'left']

// Applies appropriate values to the first element's styles based on the
// direction passed.
function applyOffsetsToStyle(element1, element2, direction) {
  element1.classList.remove(...directionClassNames)
  element1.classList.add(direction)

  switch (direction) {
    case 'top':
      element1.style.top = element2.offsetTop
      element1.style.left = element2.offsetLeft + (element2.offsetWidth / 2)
      break
    case 'right':
      element1.style.top = element2.offsetTop
      element1.style.left = element2.offsetLeft + element2.offsetWidth
      break
    case 'bottom':
      element1.style.top = element2.offsetTop + element2.offsetHeight
      element1.style.left = element2.offsetLeft + (element2.offsetWidth / 2)
      break
    case 'left':
      element1.style.top = element2.offsetTop
      element1.style.left = element2.offsetLeft
      break
  }
}

// Picks the best direction for showing element 1, given the available
// screen space in relation to element2.
function findAvailableDirectionsFor(element1, element2) {
  let windowWidth = window.innerWidth
  let windowHeight = window.innerHeight
  let pixelsToRight = windowWidth - (element2.offsetLeft + element2.offsetWidth)
  let pixelsToBottom = windowHeight -
    (element2.offsetTop + element2.offsetHeight)
  let directions = []
  if (element1.offsetWidth < element2.offsetLeft) directions.push('left')
  if (element1.offsetHeight < element2.offsetTop) directions.push('top')
  if (element1.offsetWidth < pixelsToRight) directions.push('right')
  if (element1.offsetWidth < pixelsToRight) directions.push('right')
  if (element1.offsetHeight < pixelsToBottom) directions.push('bottom')
  return directions
}

export default function fitElement(element, relatedElement, direction) {
  let directions = findAvailableDirectionsFor(element, relatedElement)
  applyOffsetsToStyle(element, relatedElement, directions[0])
}
