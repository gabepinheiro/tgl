import { get } from './http.js'
import { createNumberButton } from './components/index.js'

let games = {}
let selectedGame = {}

const $betTypeName = document.querySelector('[data-js=bet-type-name]')
const $betTypeDescription = document.querySelector('[data-js=bet-type-desc]')
const $numbersRangeContainer = document.querySelector('[data-js=numbers-range-container]')

function requestGames (callback) {
  get('src/js/games.json', callback)
}

export function app () {
  function init() {
    requestGames(response => {
      games = response
      games.types = games.types.map(game => ({
        ...game,
        selected: game.type === 'Mega-Sena'
      }))
      selectedGame = games.types.find(game => game.selected)

      console.log('Games: ', games)
      console.log('selectedGame: ', selectedGame)

      const { type, description, range } = selectedGame
      setBetTypeName(type)
      setBetTypeDescription(description)
      rangeNumbersRender(range)
    })
  }

  function setBetTypeName (typeName) {
    $betTypeName.textContent = typeName
  }

  function setBetTypeDescription (description) {
    $betTypeDescription.textContent = description
  }

  function rangeNumbersRender (range) {
    $numbersRangeContainer.innerHTML = ''
    const $fragment = document.createDocumentFragment();
    [...new Array(range)].map((_, index) => index + 1)
      .forEach((number) => {
        const $numberButton = createNumberButton(number)
        $fragment.appendChild($numberButton)
      })

    $numbersRangeContainer.appendChild($fragment)
  }

  return init
}

