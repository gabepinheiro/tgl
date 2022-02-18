import { get } from './http.js'

let games = {}
let selectedGame = {}

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
    })
  }

  function requestGames (callback) {
    get('src/js/games.json', callback)
  }

  return init
}

