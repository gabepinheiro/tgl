import { get } from './http.js'
import { $, Fragment, Element } from './utils/index.js'
import {
  createNumberButton,
  createGameTypeButton
} from './components/index.js'

let games = {}
let selectedGame = {}

const $betTypeName = $('[data-js=bet-type-name]')
const $betTypeDescription = $('[data-js=bet-type-desc]')
const $numbersRangeContainer = $('[data-js=numbers-range-container]')
const $gameTypeButtonContainer = $('[data-js=game-type-button-container]')

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
      gameTypeButtonsRender(games.types)
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
    const $fragment = Fragment();
    [...new Array(range)].map((_, index) => index + 1)
      .forEach((number) => {
        const $numberButton = createNumberButton(number)
        $fragment.appendChild($numberButton)
      })

    $numbersRangeContainer.appendChild($fragment)
  }

  function gameTypeButtonsRender (games) {
    $gameTypeButtonContainer.innerHTML = ''
    const $fragment = Fragment()
    games.forEach(game => {
      const $item = Element('li')
      const $button = createGameTypeButton(game)
      $button.addEventListener('click', handleSelectGameType(game.type))
      $item.appendChild($button)
      $fragment.appendChild($item)
    })

    $gameTypeButtonContainer.appendChild($fragment)
  }

  function handleSelectGameType (type) {
    return (e) => {
      e.preventDefault()
      games.types = games.types.map(game => ({
        ...game,
        selected: game.type === type
      }))
      selectedGame = games.types.find(game => game.type === type)

      setBetTypeName(type)
      setBetTypeDescription(selectedGame.description)
      gameTypeButtonsRender(games.types)
      rangeNumbersRender(selectedGame.range)
    }
  }

  return init
}

