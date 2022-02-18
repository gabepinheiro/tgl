import { Element, Text } from '../utils/index.js'

function createNumberButton (number) {
  const $button = Element('button')
  $button.classList.add('number-button')
  const newNumber = number < 10 ? `0${number}` : number
  $button.setAttribute('data-number', newNumber)
  $button.appendChild(Text(String(newNumber)))

  return $button
}

export { createNumberButton }
