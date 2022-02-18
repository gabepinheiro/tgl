import { get } from './http.js'

let games = {}
let selectedGame = {}

const $betTypeName = document.querySelector('[data-js=bet-type-name]')
const $betTypeDescription = document.querySelector('[data-js=bet-type-desc]')

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

      const { type, description } = selectedGame
      setBetTypeName(type)
      setBetTypeDescription(description)
    })
  }

  function setBetTypeName (typeName) {
    $betTypeName.textContent = typeName
  }

  function setBetTypeDescription (description) {
    $betTypeDescription.textContent = description
  }

  function requestGames (callback) {
    get('src/js/games.json', callback)
  }

  return init
}

