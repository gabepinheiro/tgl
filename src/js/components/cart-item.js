import { Element, Text } from "../utils/index.js"

const modifiers = {
  'Mega-Sena': 'cart__item-game-name--green',
  'Lotofácil': 'cart__item-game-name--purple',
  'Quina': 'cart__item-game-name--orange'

}

function createCartItem (item) {
  const $li = Element('li')
  $li.classList.add('cart__item')
  const $button = Element('button')
  $button.classList.add('cart__item-action-delete')
  const $iconDelete = Element('i')
  $iconDelete.classList.add('cart__item-action-delete-icon')
  $button.appendChild($iconDelete)
  const $gameInfoContainer = Element('div')
  $gameInfoContainer.classList.add('cart__item-game-info', modifiers[item.type])
  const $pElNumbers = Element('p')
  $pElNumbers.classList.add('cart__item-game-numbers')
  const textNodeNumbers = Text(item.numbers?.join(', ') ?? '-')
  $pElNumbers.appendChild(textNodeNumbers)
  const $pElTypeNameAndPrice = Element('p')
  const $typeName = Element('span')
  $typeName.classList.add('cart__item-game-name', modifiers[item.type])
  const textNodeTypeName = Text(item.type+' ')
  $typeName.appendChild(textNodeTypeName)
  $pElTypeNameAndPrice.appendChild($typeName)
  const $price = Element('span')
  $price.classList.add('cart__item-game-value')
  const textNodePrice = Text(item.price)
  $price.appendChild(textNodePrice)
  $pElTypeNameAndPrice.appendChild($price)


  $gameInfoContainer.appendChild($pElNumbers)
  $gameInfoContainer.appendChild($pElTypeNameAndPrice)
  $li.appendChild($button)
  $li.appendChild($gameInfoContainer)

  return $li
}

export { createCartItem }
