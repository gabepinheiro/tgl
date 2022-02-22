import { Element, Text } from '../utils/index.js'

function createGameTypeButton ({type, selected, color}) {
  const $button = Element('button')
  const textNode = Text(type)
  $button.appendChild(textNode)
  $button.style.backgroundColor = selected ? color : '#fff'
  $button.style.color  = selected ? '#fff' : color
  $button.setAttribute('class', `btn game-type-button`)

  return $button
}

export { createGameTypeButton }
