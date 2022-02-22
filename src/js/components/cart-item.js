import { Element, getCurrencyFormatted } from "../utils/index.js"

function createCartItem (item, handleDeleteBetOnCart) {
  const { game, numbers, id } = item
  const $li = Element('li')
  $li.classList.add('cart__item')
  $li.style.color =  game.color
  const $button = Element('button')
  $li.appendChild($button)
  $button.classList.add('cart__item-action-delete')
  $button.addEventListener('click', handleDeleteBetOnCart(id))
  $button.insertAdjacentHTML('beforeend', `
      <i class="cart__item-action-delete-icon"></i>
  `)
  $li.insertAdjacentHTML('beforeend', `
    <div class="cart__item-game-info">
      <p class="cart__item-game-numbers">
        ${numbers.join(', ')}
      </p>
      <p>
        <span class="cart__item-game-name">
          ${game.type+' '}
        </span>
        <span class="cart__item-game-value">${getCurrencyFormatted(game.price)}</span>
      </p>
    </div>
  `);

  return $li
}

export { createCartItem }
