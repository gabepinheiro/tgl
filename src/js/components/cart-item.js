import { Element, getCurrencyFormatted } from "../utils/index.js"

const modifiers = {
  'Mega-Sena': 'cart__item-game-name--green',
  'Lotofácil': 'cart__item-game-name--purple',
  'Quina': 'cart__item-game-name--orange',
}

function createCartItem (item, handleDeleteBetOnCart) {
  const $li = Element('li')
  $li.classList.add('cart__item')
  const $button = Element('button')
  $li.appendChild($button)
  $button.classList.add('cart__item-action-delete')
  $button.addEventListener('click', handleDeleteBetOnCart(item.id))
  $button.insertAdjacentHTML('beforeend', `
      <i class="cart__item-action-delete-icon"></i>
  `)
  $li.insertAdjacentHTML('beforeend', `
    <div class="cart__item-game-info ${modifiers[item.type]}">
      <p class="cart__item-game-numbers">
        ${item.numbers.join(', ')}
      </p>
      <p>
        <span class="cart__item-game-name ${modifiers[item.type]}">
          ${item.type+' '}
        </span>
        <span class="cart__item-game-value">${getCurrencyFormatted(item.price)}</span>
      </p>
    </div>
  `);

  return $li
}

export { createCartItem }
