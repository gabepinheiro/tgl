import { Element, Text } from '../utils/index.js'

const modifiers = {
  default: ['btn btn--sm', 'btn--border-md', 'btn--rounded'],
  'Mega-Sena': 'btn__green',
  'Lotofácil': 'btn__purple',
  'Quina': 'btn__orange'
}

function createGameTypeButton ({type, selected}) {
  const $button = Element('button')
  const textNode = Text(type)
  const cls = selected
    ? modifiers['default'].concat(modifiers[type])
    : modifiers['default'].concat(modifiers[type]+'--outline')
  $button.setAttribute('class', cls.join(' '))
  $button.appendChild(textNode)

  return $button
}

export { createGameTypeButton }
